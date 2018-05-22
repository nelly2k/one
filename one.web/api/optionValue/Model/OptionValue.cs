using System;
using System.ComponentModel.DataAnnotations.Schema;
using one.api.database;
using one.api.story;

namespace one.api.optionValue
{
    public class OptionValue : Entity
    {
        public feature.Feature Feature { get; set; }
        public option.Option Option { get; set; }

        public Story Story {get;set;}
        public Guid StoryId { get; set; }
        public int OptionId { get; set; }
        public int FeatureId { get; set; }

        public OptionValueType OptionValueType { get; set; }
        public string Value { get; set; }

        public int Order { get; set; }
    }
}