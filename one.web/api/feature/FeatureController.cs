using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using one.api.common;
using one.api.feature;
using one.api.story;
using one.api.filters;

namespace One.Api.Feature
{

    [Route("api/feature")]
    [Produces("application/json")]
    public class FeatureController : Controller
    {

        [HttpGet("{storyId}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(IEnumerable<FeatureBrief>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromRoute]Guid storyId, [FromServices]IGetListQuery<Guid, FeatureBrief> getListQuery)
        {
            return Ok(await getListQuery.Execute(storyId));
        }

        [HttpPost("{storyId}")]
        [ValidateModel]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(int),(int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromRoute]Guid storyId, [FromBody] NewFeatureRequest newFeatureRequest,
            [FromServices]IAddCommand<AddFeature,int> addFeatureCommand)
        {
            var addFeature = new AddFeature{
                Title = newFeatureRequest.Title,
                StoryId = storyId
            };
            var newFeatureId =  await addFeatureCommand.Execute(addFeature);
            return Ok(newFeatureId);
        }

        [HttpPut("{storyId}/{id}/{name}/{value}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromRoute]Guid storyId, 
            [FromRoute]int id,
            [FromRoute]string name,
            [FromRoute] string value,
            [FromServices] IUpdateCommand<Guid,int,one.api.feature.Feature> updateCommand){
                    await updateCommand.Execute(storyId, id, name, value);
                    return Ok();
        }    

        [HttpDelete("{storyId}/{id}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete([FromRoute] Guid storyId,
            [FromRoute]int id,
            [FromServices]IDeleteCommand<Guid,int,one.api.feature.Feature> deleteCommand){
                await deleteCommand.Execute(storyId, id);
                return Ok();
            }

    }
}