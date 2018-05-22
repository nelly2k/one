using Microsoft.Extensions.DependencyInjection;
using System;
using one.api.common;
using one.api.story;
using one.api.feature;
using one.api.option;
using one.web.image;
using one.api.optionValue;

namespace one.web
{
    public static class DependencyConfig{
        public static void Configure(IServiceCollection services ){
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IUpdateCommand, UpdateCommand>();
            services.AddScoped<IAddCommand, AddCommand>();
            services.AddScoped<IDateTimeService, DateTimeService>();

            services.AddScoped<IGetQuery<Guid, StoryDetail>, GetStoryQuery>();
            services.AddScoped<ISearchStoryQuery, SearchStoryQuery>();
            services.AddScoped<IAddCommand<NewStory, Guid>, AddStoryCommand>();
            services.AddScoped<IDeleteCommand<Guid, Story>, DeleteStoryCommand>();
            services.AddScoped<IUpdateCommand<Guid, Story>, UpdateStoryCommand>();

            services.AddScoped<IGetListQuery<Guid, FeatureBrief>, GetFeatureListQuery>();
            services.AddScoped<IAddCommand<AddFeature, int>, AddFeatureCommand>();
            services.AddScoped<IUpdateCommand<Guid, int, Feature>, UpdateFeatureCommand>();
            services.AddScoped<IDeleteCommand<Guid, int, Feature>, DeleteFeatureCommand>();

            services.AddScoped<IAddCommand<NewOption, int>, AddOptionCommand>();
            services.AddScoped<IDeleteCommand<Guid, int, Option>, DeleteOptionCommand>();
            services.AddScoped<IUpdateCommand<Guid, int, Option>, UpdateOptionCommand>();

            services.AddScoped<IAddCommand<NewOptionValue>, AddOptionValueCommand>();
            services.AddScoped<IDeleteCommand<Guid, int,int,int,OptionValue>,DeleteOptionValueCommand>();
            services.AddScoped<IUpdateCommand<Guid,int,int,int,OptionValue>,UpdateOptionValueCommnad>();
        }
    }
}