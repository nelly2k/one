using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using one.api.database;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using one.api.common;

namespace one.api.feature
{
    public class GetFeatureListQuery : IGetListQuery<Guid, FeatureBrief>
    {
        private readonly OneContext context;

        public GetFeatureListQuery(OneContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<FeatureBrief>> Execute(Guid guid)
        {
            return await context.Features
                .Where(x => x.StoryId == guid)
                .Select(x => new FeatureBrief
                {
                    Title = x.Title
                }).ToListAsync();
        }

    }
}