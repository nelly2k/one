using AutoMapper;

namespace one.api.feature
{
    public class FeatureProfile : Profile
    {
        public FeatureProfile()
        {
            CreateMap<Feature, FeatureBrief>();
            CreateMap<AddFeature, Feature>();
        }
    }
}