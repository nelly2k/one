using System;

namespace one.api.story{
    public class StoryBrief{
        public Guid Id {get;set;}
        public string Title { get; set; }

        public int FeaturesNumber { get; set; }
        public int OptionsNumber { get; set; }
    }
}