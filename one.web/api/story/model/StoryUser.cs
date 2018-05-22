using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace one.api.story
{
    public class StoryUser
    {
        [ForeignKey("StoryId")]
        public Story Story { get; set; }
        [Key]
        [Column(Order = 1)]
        public Guid StoryId { get; set; }
        [ForeignKey("UserId")]
        public user.ApplicationUser User { get; set; }
        [Key]
        [Column(Order = 2)]
        public Guid UserId { get; set; }

        public AccessType AccessType { get; set; }
    }
}