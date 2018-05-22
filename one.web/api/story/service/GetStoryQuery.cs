using System;
using System.Threading.Tasks;
using one.api.common;
using one.api.database;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace one.api.story
{
    public class GetStoryQuery : IGetQuery<Guid, StoryDetail>
    {
        private readonly OneContext context;
        private readonly IMapper mapper;

        public GetStoryQuery(OneContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<StoryDetail> Execute(Guid id)
        {
            Console.WriteLine(await context.Stories.CountAsync());
            var story = await context.Stories
                .Include(x=>x.Features)
                .Include(x=>x.Options)
                .Include(x=>x.OptionValues)
                .SingleAsync(x=>x.Id == id);
            return mapper.Map<StoryDetail>(story);
        }
        
    }
}