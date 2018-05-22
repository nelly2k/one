using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using one.api.database;

namespace one.api.story
{
//TODO implementation required
    public class ExistsAttribute : TypeFilterAttribute
    {
        public ExistsAttribute() : base(typeof(StoryExistsImpl))
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
                
                await next();
            }

            private async Task<bool> ValidateExists(ActionExecutingContext context, string paramName)
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