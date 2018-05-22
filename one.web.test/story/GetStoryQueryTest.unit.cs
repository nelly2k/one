using System;
using one.api.story;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using FizzWare.NBuilder;

namespace one.web.test
{
    public class GetStoryQueryTest:BaseInMemoryTest
    {
        GetStoryQuery query;

        [SetUp]
        public void Setup(){
            query = new GetStoryQuery(_context, _serviceProvider.GetService<IMapper>());
        }

        [Test]
        public async Task ReturnsCorrectType()
        {
            var guid = Guid.NewGuid();
            var story = Builder<Story>.CreateNew()
                .With(x=>x.Id = guid)
                .Build();
            
            _context.Add(story);
            _context.SaveChanges();
            
            var result = await query.Execute(guid);
            Assert.That(result, Is.AssignableFrom<StoryDetail>());
        }

    }
}
