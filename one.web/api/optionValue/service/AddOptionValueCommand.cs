using System.Threading.Tasks;
using AutoMapper;
using one.api.common;

namespace one.api.optionValue{
    public class AddOptionValueCommand : IAddCommand<NewOptionValue>
    {
        private readonly IAddCommand addCommad;

        public AddOptionValueCommand(IAddCommand addCommad)
        {
            this.addCommad = addCommad;
        }

        public async Task Execute(NewOptionValue model)
        {
            await addCommad.Add<NewOptionValue, OptionValue>(model);
        }
    }
}