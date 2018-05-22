using System.Threading.Tasks;
using AutoMapper;
using one.api.common;
using one.api.database;

namespace one.api.feature
{
    public class AddFeatureCommand : IAddCommand<AddFeature, int>
    {
        private readonly IAddCommand addCommand;

        public AddFeatureCommand(IAddCommand addCommand)
        {
            this.addCommand = addCommand;
        }

        public async Task<int> Execute(AddFeature model)
        {
            return await addCommand.Add<AddFeature, Feature, int>(model, x => x.Id);
        }
    }
}