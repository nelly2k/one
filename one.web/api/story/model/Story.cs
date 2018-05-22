using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using one.api.database;

namespace one.api.story
{
    public class Story : Entity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<feature.Feature> Features { get; set; }
        public IEnumerable<option.Option> Options { get; set; }
        public IEnumerable<StoryUser> Users { get; set; }
        public IEnumerable<optionValue.OptionValue> OptionValues { get; set; }
    }
}