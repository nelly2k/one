using System;

namespace one.api.option
{
    public class NewOption:NewOptionRequest
    {
        public Guid StoryId { get; set; }
    }
}