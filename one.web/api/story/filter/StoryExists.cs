using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using one.api.database;

namespace one.api.story
{

    public class StoryExistsAttribute : TypeFilterAttribute
    {
        public StoryExistsAttribute() : base(typeof(StoryExistsImpl))
        {
        }

        private class StoryExistsImpl : IAsyncActionFilter
        {
            private readonly OneContext oneContext;

            public StoryExistsImpl(OneContext oneContext)
            {
                this.oneContext = oneContext;
            }

            public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                if (context.ActionArguments.ContainsKey("storyId"))
                {
                    if (!await ValidateComparsionExists(context, "storyId")){
                        return;
                    }
                    
                }
                else if (context.ActionArguments.ContainsKey("id") && !await ValidateComparsionExists(context, "id"))
                {
                    
                    return;
                }

                await next();
            }

            private async Task<bool> ValidateComparsionExists(ActionExecutingContext context, string paramName)
            {
                var strId = context.ActionArguments[paramName].ToString();
                var id = Guid.Parse(strId);
                if (id != null)
                {
                    if (await oneContext.Stories.AllAsync(x => x.Id != id))
                    {
                        context.Result = new NotFoundObjectResult(id);
                        return false;
                    }
                }

                return true;
            }
        }
    }
}