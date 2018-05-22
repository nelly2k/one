using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.story
{
    public class UpdateStoryCommand : IUpdateCommand<Guid, Story>
    {
        private readonly OneContext oneContext;
        private readonly IUpdateCommand updateCommand;

        public UpdateStoryCommand(OneContext oneContext, IUpdateCommand updateCommand)
        {
            this.oneContext = oneContext;
            this.updateCommand = updateCommand;
        }

        public async Task Execute(Guid id, string name, object value)
        {
            await updateCommand.UpdateEntity<Story>(async x => await x.Stories.SingleAsync(r => r.Id == id), name, value);
        }
    }
}