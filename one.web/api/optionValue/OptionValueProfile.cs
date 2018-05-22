using AutoMapper;

namespace one.api.optionValue
{
    public class OptionValueProfile : Profile
    {
        public OptionValueProfile()
        {
            CreateMap<NewOptionValue, OptionValue>();
            CreateMap<NewOptionValueRequest, NewOptionValue>();
            CreateMap<OptionValue, OptionValueBrief>();
        }
    }
}