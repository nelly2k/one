using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using one.api.feature;
using one.api.optionValue;

namespace one.api.story
{
    public class StoryDetail{

        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }

        public DateTime UpdatedDate { get; set; }

        public IEnumerable<FeatureBrief> Features {get;set;}
        public IEnumerable<OptionBrief> Options {get;set;}
        public IEnumerable<OptionValueBrief> OptionValues {get;set;}
    }
}