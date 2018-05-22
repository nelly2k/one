using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using one.api.database;

namespace one.api.option
{
    public class Option:Entity{
        [ForeignKey("StoryId")]
        public story.Story Story { get; set; }
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Key]
        [Column(Order = 1)]
        public Guid StoryId { get; set; }
        public IEnumerable<api.optionValue.OptionValue> OptionValues { get; set; }
        public string Title { get; set; }
    }
}