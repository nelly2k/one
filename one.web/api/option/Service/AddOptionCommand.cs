using System.Threading.Tasks;
using one.api.common;
using one.api.database;

namespace one.api.option
{
    public class AddOptionCommand : IAddCommand<NewOption, int>
    {
        private readonly OneContext oneContext;

        public AddOptionCommand(OneContext oneContext)
        {
            this.oneContext = oneContext;
        }

        public async Task<int> Execute(NewOption model)
        {
            var option = new Option
            {
                StoryId = model.StoryId,
                Title = model.Title
            };
            oneContext.Add(option);

            await oneContext.SaveChangesAsync();

            return option.Id;

        }
    }
}