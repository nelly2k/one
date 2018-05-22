using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.option
{
    public class DeleteOptionCommand : IDeleteCommand<Guid, int, Option>
    {
        private readonly OneContext oneContext;

        public DeleteOptionCommand(OneContext oneContext)
        {
            this.oneContext = oneContext;
        }

        public async Task Execute(Guid id0, int id1)
        {
            var option = await oneContext.Options.SingleAsync(x => x.StoryId == id0
                                                            && x.Id == id1);

            oneContext.Remove(option);
            await oneContext.SaveChangesAsync();
        }
    }
}