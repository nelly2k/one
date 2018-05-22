using System;
using System.Threading.Tasks;
using AutoMapper;
using one.api.common;
using one.api.database;

namespace one.api.story
{
    public class AddStoryCommand : IAddCommand<NewStory, Guid>
    {
        private readonly OneContext context;
        private readonly IDateTimeService dateTimeService;
        private readonly IMapper mapper;

        public AddStoryCommand(OneContext context, IDateTimeService dateTimeService,
            IMapper mapper)
        {
            this.context = context;
            this.dateTimeService = dateTimeService;
            this.mapper = mapper;
        }

        public async Task<Guid> Execute(NewStory model)
        {
            var story = mapper.Map<NewStory,Story>(model);
            story.CreatedDate = dateTimeService.Now;
            story.UpdatedDate = dateTimeService.Now;

            context.Add(story);
            
            await context.SaveChangesAsync();

            return story.Id;
        }
    }
}