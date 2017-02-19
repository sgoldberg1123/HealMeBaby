using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http.Headers;
using System.Web.Http.Cors;
namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SupportedMediaTypes
                .Add(new MediaTypeHeaderValue("text/html"));
            config.Routes.MapHttpRoute(
                name: "GetAll",
                routeTemplate: "api/{controller}/all",
                defaults: new { action = "GetAll" }
            );
            config.Routes.MapHttpRoute(
                name: "GetById",
                routeTemplate: "api/{controller}/id/{id}",
                defaults: new {action = "GetById", id = ""}
            );
            config.Routes.MapHttpRoute(
                name: "postTest",
                routeTemplate: "api/{controller}/add",
                defaults: new { action = "Add"}
            );
        }
    }
}
