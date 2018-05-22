using System.Collections.Generic;

namespace one.api.story
{
    public class SearchResponse{
        public int Page { get; set; }
        public int Pages {get;set;}
        public int Total { get; set; }

        public IEnumerable<StoryBrief> Stories { get; set; }
    }
}