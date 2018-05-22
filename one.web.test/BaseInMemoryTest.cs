using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using one.api.database;


namespace one.web.test
{
    public class BaseInMemoryTest
    {
        protected OneContext _context;
        protected ServiceProvider _serviceProvider;

        [SetUp]
        public void BaseInMemoryTestSetup(){
             var serviceCollection = new ServiceCollection()
                         .AddEntityFrameworkInMemoryDatabase()
                         .AddAutoMapper(typeof(Startup));

            _serviceProvider = serviceCollection.BuildServiceProvider();
            var options = new DbContextOptionsBuilder<OneContext>()
                .UseInMemoryDatabase("OneContext")
                .UseInternalServiceProvider(_serviceProvider)
                .Options;

            _context = new OneContext(options);
            _context.Database.EnsureCreated();
        }

        [TearDown]
        public void BaseInMemoryTestTearDown(){
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}