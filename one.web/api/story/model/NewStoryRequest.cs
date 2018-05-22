using System.ComponentModel.DataAnnotations;

namespace one.api.story
{
    public class NewStory
    {
        [Required]
        public string Title { get; set; }
    }
}