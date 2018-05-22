const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: {
            modules: false
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', 'scss']
        },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)?$/,
                    include: /ClientApp/,
                    use: 'awesome-typescript-loader?silent=true'
                }, {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // set the current working directory for displaying module paths
                cwd: process.cwd()
            })
        ]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client': './ClientApp/boot-client.tsx',
            'style':"./ClientApp/asset/style.scss"
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    modules: false,
                                    url: true,
                                    minimize: true
                                }
                            }, {
                                loader: "sass-loader"
                            }
                        ]

                    })
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: isDevBuild
                            ? 'css-loader'
                            : 'css-loader?minimize'
                    })
                }
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir)
        },
        plugins: [
            new ExtractTextPlugin('site.css'), new webpack.DllReferencePlugin({context: __dirname, manifest: require('./wwwroot/dist/vendor-manifest.json')})
        ].concat(isDevBuild
            ? [// Plugins that apply in development builds only
                new webpack.SourceMapDevToolPlugin({
                    filename: '[file].map', // Remove this line if you prefer inline source maps
                    moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
                })]
            : [
                // Plugins that apply in production builds only
                new webpack
                    .optimize
                    .UglifyJsPlugin()
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in
    // Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: {
            mainFields: ['main']
        },
        entry: {
            'main-server': './ClientApp/boot-server.tsx'
        },
        plugins: [new webpack.DllReferencePlugin({context: __dirname, manifest: require('./ClientApp/dist/vendor-manifest.json'), sourceType: 'commonjs2', name: './vendor'})],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    const sassBundleConfig = merge(sharedConfig(), {})
    return [clientBundleConfig, serverBundleConfig];
};