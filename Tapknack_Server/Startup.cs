using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Security.Authentication;
using NadoMapper.Interfaces;
using System.Collections.Generic;
using NadoMapper.Models;
using NadoMapper;
using NadoMapper.SqlProvider;
using Tapknack_Server.Interfaces;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server
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
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Tapknack_Server", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                          builder =>
                          {
                                  builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                              });
            });

            IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();

            services.AddSingleton(configuration);
            services.AddTransient<IDbService, SqlService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tapknack_Server v1"));

            }

            app.UseRouting();
            app.UseCors();

            app.UseExceptionHandler((app) => app.Run(async context =>
            {
                var exception = context.Features.Get<IExceptionHandlerPathFeature>().Error;

                await HandleException(exception, context);
            }));

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }

        private static async Task HandleException(Exception exception, HttpContext context)
        {

            // .. TODO: Handle different signin and authorization exceptions here (change status codes)

            /* if (exception is SqlException)
            {
              var sqlException = exception as SqlException;

              await context.Response.WriteAsJsonAsync(new
              { Success = false, Message = sqlException.Message, Number = sqlException.Number });
              return;
            } */

            if (exception is AuthenticationException)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync(new
                { Success = false, Exception = exception.ToString(), exception.Message });
                return;
            }

            await context.Response.WriteAsJsonAsync(new
            { Success = false, Exception = exception.ToString(), exception.Message });
        }
    }
}
