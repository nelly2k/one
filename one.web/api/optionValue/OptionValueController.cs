using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using one.api.common;
using one.api.filters;

namespace one.api.optionValue
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class OptionValueController : Controller
    {
        private readonly IMapper mapper;

        public OptionValueController(IMapper mapper)
        {
            this.mapper = mapper;
        }

        [HttpPut("{storyId}/{featureId}/{optionId}/{type}/{value}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put(
            [FromRoute]Guid storyId,
            [FromRoute]int featureId,
            [FromRoute]int optionId,
            [FromRoute]OptionValueType type,
            [FromRoute]string value,
            [FromServices] IUpdateCommand<Guid, int, int, OptionValueType, OptionValue> updateCommand)
        {

            await updateCommand.Execute(storyId, featureId, optionId, type, "Value", value);
            return Ok();
        }

        //put
        [HttpDelete("{storyId}/{featureId}/{optionId}/{type}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete([FromRoute]Guid storyId,
            [FromRoute] int featureId,
            [FromRoute] int optionId,
            [FromRoute]OptionValueType type,
            [FromServices] IDeleteCommand<Guid, int, int, OptionValueType, OptionValue> deleteCommand)
        {
            await deleteCommand.Execute(storyId, featureId, optionId, type);
            return Ok();
        }

        [HttpPost("{storyId}/{featureId}/{optionId}")]
        [ValidateModel]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Post(
            [FromRoute] Guid storyId,
            [FromRoute]int featureId,
            [FromRoute]int optionId,
            [FromBody]NewOptionValueRequest optionValueRequest,
            [FromServices] IAddCommand<NewOptionValue, int> addCommand)
        {
            var model = mapper.Map<NewOptionValue>(optionValueRequest);
            model.StoryId = storyId;
            model.FeatureId  = featureId;
            model.OptionId = optionId;
            var newOptionValueId = await addCommand.Execute(model);

            return Ok(newOptionValueId);
        }
    }
}