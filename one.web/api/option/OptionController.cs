using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using one.api.common;
using one.api.story;
using one.api.filters;

namespace one.api.option
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class OptionController : Controller
    {

        [HttpPost("{storyId}")]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [StoryExists]
        [ValidateModel]
        public async Task<IActionResult> Post([FromRoute]Guid storyId, [FromBody]NewOptionRequest model,
            [FromServices]IAddCommand<NewOption, int> addOptionCommand)
        {
            var newOption = new NewOption{
                Title = model.Title,
                StoryId=storyId
            };

            var newOptionId =  await addOptionCommand.Execute(newOption);
            return Ok(newOptionId);
        }

        [HttpDelete("{storyId}/{id}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Delete([FromRoute] Guid storyId, [FromRoute] int id,
            [FromServices] IDeleteCommand<Guid, int, Option> deleteOptionCommand)
        {
            await deleteOptionCommand.Execute(storyId, id);
            return Ok();
        }

        [HttpPut("{storyId}/{id}/{name}/{value}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromRoute]Guid storyId,
            [FromRoute]int id,
            [FromRoute]string name,
            [FromRoute]string value,
            [FromServices] IUpdateCommand<Guid,int,Option> updateCommand ){
                await updateCommand.Execute(storyId, id, name, value);
                return Ok();
            }
    }
}