const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('vendor.css');

    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                'domain-task',
                'event-source-polyfill',
                'history',
                'react',
                'react-dom',
                'react-router-dom',
                'react-redux',
                'redux',
                'redux-thunk',
                'react-router-redux',
                './ClientApp/asset/vendor.scss'
            ],
        },
        output: {
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
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
                            },
                            { loader: "sass-loader" }
                        ]

                    })
                }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    // const clientBundleConfig = merge(sharedConfig, {
    //     output: { path: path.join(__dirname, 'wwwroot', 'dist') },
    //     module: {
    //         rules: [
    //             { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
    //         ]
    //     },
    //     plugins: [
    //         extractCSS,
    //         new webpack.DllPlugin({
    //             path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
    //             name: '[name]_[hash]'
    //         })
    //     ].concat(isDevBuild ? [] : [
    //         new webpack.optimize.UglifyJsPlugin()
    //     ])
    // });

    // const serverBundleConfig = merge(sharedConfig, {
    //     target: 'node',
    //     resolve: { mainFields: ['main'] },
    //     output: {
    //         path: path.join(__dirname, 'ClientApp', 'dist'),
    //         libraryTarget: 'commonjs2',
    //     },
    //     module: {
    //         rules: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }]
    //     },
    //     entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
    //     plugins: [
    //         new webpack.DllPlugin({
    //             path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
    //             name: '[name]_[hash]'
    //         })
    //     ]
    // });

    // return [clientBundleConfig, serverBundleConfig];
    return [clientBundleConfig];
};
