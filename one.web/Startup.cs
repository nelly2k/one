using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NSwag.AspNetCore;
using one.api.database;
using one.api.user;
using AutoMapper;

namespace one.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
           
            services.AddCors();
            services.AddAuthentication().AddGoogle(options =>
            {
                options.ClientId = Configuration["Authentication:Google:ClientId"];
                options.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
            });
           
            // services.AddDbContext<one.api.database.OneContext>(op=>op.UseSqlServer("data source=NELLISURFACE3\\LOCAL;Initial Catalog=one2;Integrated Security=SSPI;"));
            services.AddDbContext<one.api.database.OneContext>(op => op.UseSqlServer("data source=(local);Initial Catalog=one2;Integrated Security=SSPI;"));
            // services.AddDbContext<OneContext>(optionsAction: op =>op.UseInMemoryDatabase("OneContext"));
            services.AddIdentity<ApplicationUser, Role>().AddEntityFrameworkStores<OneContext>().AddDefaultTokenProviders();
            DependencyConfig.Configure(services);
            services.AddAutoMapper(); 
            //MappingConfig.Configure();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();  
                app.UseDatabaseErrorPage();  
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, cfg =>
            {
                cfg.GeneratorSettings.DefaultUrlTemplate = "{controller}/{action}/{id?}";
            });
            
            app.UseAuthentication();  

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // routes.MapSpaFallbackRoute(
                //     name: "spa-fallback",
                //     defaults: new { controller = "Home", action = "Index" });
            });

            app.MapWhen(a => !a.Request.Path.Value.StartsWith("/swagger"), builder =>
                builder.UseMvc(routes =>
                {
                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });
                })
            );
        }
    }
}
