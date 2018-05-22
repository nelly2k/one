using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using one.api.story;
using one.api.database;
using one.api.optionValue;

namespace  one.api.feature{
    public class Feature:Entity
    {
        [ForeignKey("StoryId")]
        public Story Story { get; set; }
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Key]
        [Column(Order = 1)]
        public Guid StoryId { get; set; }
        public IEnumerable<OptionValue> OptionValues { get; set; }
        public string Title { get; set; }

        public int Order { get; set; }

        public bool IsNumber { get; set; }
        public FeatureNumberOption FeatureNumberOption {get;set;}
    }
}