using System;

namespace one.api.optionValue
{
    public class NewOptionValue{
        public OptionValueType OptionValueType { get; set; }
        public string Value { get; set; }

        public Guid StoryId { get; set; }
        public int FeatureId { get; set; }
        public int OptionId { get; set; }

        public int? Order {get;set;}
    }
}