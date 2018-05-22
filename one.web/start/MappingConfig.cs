using System;
using System.Linq;
using System.Reflection;
using AutoMapper;

namespace one.web
{
    public static class MappingConfig{
        public static void Configure(Func<Type, object> resolver = null)
        {
            var parentType = typeof(Profile);
            var types = Assembly.GetExecutingAssembly().GetTypes().Where(p => parentType.IsAssignableFrom(p));
            
            Mapper.Initialize(cfg =>
            {
                foreach (var profileType in types)
                {
                    cfg.AddProfile((Profile)Activator.CreateInstance(profileType));
                }
                if (resolver != null)
                {
                    cfg.ConstructServicesUsing(resolver);
                }

            });
        }
    }
}