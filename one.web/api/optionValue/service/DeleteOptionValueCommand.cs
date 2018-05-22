using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;
using one.api.database;

namespace one.api.optionValue
{
    public class DeleteOptionValueCommand : IDeleteCommand<Guid, int, int, int, OptionValue>
    {
        private readonly OneContext oneContext;

        public DeleteOptionValueCommand(OneContext oneContext)
        {
            this.oneContext = oneContext;
        }

        public async Task Execute(Guid id0, int id1, int id2, int id3)
        {
            var optionValue = await oneContext.OptionValues
                .SingleAsync(x => x.StoryId == id0
                && x.FeatureId == id1
                && x.OptionId == id2
                && x.OptionValueType.Equals(id3));
            oneContext.Remove(optionValue);
            await oneContext.SaveChangesAsync();
        }
    }
}