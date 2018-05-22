using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.feature
{
    public class UpdateFeatureCommand : IUpdateCommand<Guid, int, Feature>
    {
        private readonly IUpdateCommand updateCommand;

        public UpdateFeatureCommand( IUpdateCommand updateCommand)
        {
            this.updateCommand = updateCommand;
        }

        public async Task Execute(Guid id0, int id1, string name, object value)
        {
            await updateCommand.UpdateEntity(c => c.Features.SingleAsync(x => x.StoryId == id0 && x.Id == id1), name, value);
        }
    }
}