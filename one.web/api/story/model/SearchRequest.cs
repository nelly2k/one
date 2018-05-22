using System;

namespace one.api.story{
    public class SearchRequest{
        public string Term { get; set; } = "";
        public int? Page { get; set; }=1;

    }
}