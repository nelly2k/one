using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using one.api.common;
using one.api.filters;

namespace one.api.story
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StoryController : Controller
    {

        [HttpGet("{id}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(StoryDetail), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Get([FromRoute]Guid id,
            [FromServices]IGetQuery<Guid, StoryDetail> getQuery)
        {
            return Ok(await getQuery.Execute(id));
        }

        ///api/story?Page=2&Term=blah
        [HttpGet]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(SearchResponse), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Search([FromQuery]SearchRequest searchRequest,
            [FromServices]ISearchStoryQuery searchQuery)
        {
          return Ok(await searchQuery.Search(searchRequest));
        }

        [HttpPost]
        [ValidateModel]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody]NewStory model,
            [FromServices]IAddCommand<NewStory, Guid> addCommand)
        {
            return Ok(await addCommand.Execute(model));
        }

        [HttpPut("{id}/{name}/{value}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromRoute]Guid id,
            [FromRoute]string name,
            [FromRoute]string value,
            [FromServices] IUpdateCommand<Guid, Story> updateStoryCommand)
        {
            await updateStoryCommand.Execute(id, name, value);
            return Ok();
        }

        [HttpDelete("{id}")]
        [StoryExists]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Delete([FromRoute]Guid id,
            [FromServices]IDeleteCommand<Guid, Story> storyDeleteCommand)
        {
            await storyDeleteCommand.Execute(id);
            return Ok();
        }
    }
}