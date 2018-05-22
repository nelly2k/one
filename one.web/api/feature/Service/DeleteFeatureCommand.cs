using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.feature{
    public class DeleteFeatureCommand : IDeleteCommand<Guid, int, Feature>
    {
        private readonly OneContext oneContext;

        public DeleteFeatureCommand(OneContext oneContext)
        {
            this.oneContext = oneContext;
        }

        public async Task Execute(Guid id0, int id1)
        {
            var feature = await oneContext.Features.SingleAsync(x=>x.StoryId == id0 && x.Id == id1);
            oneContext.Remove(feature);
            await oneContext.SaveChangesAsync();
        }
    }
}