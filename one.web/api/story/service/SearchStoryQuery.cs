using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using one.api.database;

namespace one.api.story
{

    public interface ISearchStoryQuery
    {
        Task<SearchResponse> Search(SearchRequest request);
    }
    public class SearchStoryQuery : ISearchStoryQuery
    {
        private readonly OneContext oneContext;
        private readonly IMapper mapper;

        public SearchStoryQuery(OneContext oneContext,IMapper mapper )
        {
            this.oneContext = oneContext;
            this.mapper = mapper;
        }

        public async Task<SearchResponse> Search(SearchRequest request)
        {
            var perPage = 5;
            var page = request.Page ?? 1;
            var all = oneContext.Stories.Where(t => request.Term == "" || t.Title.Contains(request.Term)).OrderByDescending(x=>x.Id);

            var paged = (await all
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .Include(x => x.Features)
            .Include(x => x.Options)
            .ToListAsync()).Select(mapper.Map<StoryBrief>);

            var total = all.Count();
            var result = new SearchResponse
            {
                Page = request.Page ?? 1,
                Pages = total / perPage,
                Total = all.Count(),
                Stories = paged
            };
            return result;
        }
    }
}