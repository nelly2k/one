using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.story
{
    public class DeleteStoryCommand : IDeleteCommand<Guid, Story>
    {
        private readonly OneContext context;

        public DeleteStoryCommand(OneContext context)
        {
            this.context = context;
        }

        public async Task Execute(Guid id)
        {
            var story = await context.Stories.SingleAsync(x=>x.Id == id);
            context.Remove(story);
            await context.SaveChangesAsync();
        }
    }
}