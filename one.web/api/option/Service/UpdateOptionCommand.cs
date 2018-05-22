using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.option
{
    public class UpdateOptionCommand : IUpdateCommand<Guid, int, Option>
    {
        private readonly IUpdateCommand updateCommand;

        public UpdateOptionCommand(IUpdateCommand updateCommand)
        {
            this.updateCommand = updateCommand;
        }

        public async Task Execute(Guid id0, int id1, string name, object value)
        {
            await updateCommand.UpdateEntity(c => c.Options.SingleAsync(x => x.StoryId == id0 && x.Id == id1), name, value);
        }
    }


}