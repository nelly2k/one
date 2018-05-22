using System.Linq;
using AutoMapper;

namespace one.api.story
{
    public class StoryProfile : Profile
    {
        public StoryProfile()
        {
            CreateMap<NewStory, Story>();
            CreateMap<Story, StoryDetail>();
            CreateMap<Story, StoryBrief>()
            .ForMember(d => d.FeaturesNumber, o => o.MapFrom(s => s.Features.Count()))
            .ForMember(d => d.OptionsNumber, o => o.MapFrom(s => s.Options.Count()))

            ;
        }
    }
}