using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.common;

namespace one.api.optionValue
{
    public class UpdateOptionValueCommnad : IUpdateCommand<Guid, int, int, int, OptionValue>
    {
        private readonly IUpdateCommand updateCommand;

        public UpdateOptionValueCommnad(IUpdateCommand updateCommand)
        {
            this.updateCommand = updateCommand;
        }

        public async Task Execute(Guid id0, int id1, int id2, int id3, string name, object value)
        {
            await updateCommand.UpdateEntity(c=>
                c.OptionValues.SingleAsync(x=>x.StoryId == id0
                                            && x.FeatureId == id1
                                            && x.OptionId == id2
                                            && x.OptionValueType.Equals(id3)), name, value);
            
        }
    }
}