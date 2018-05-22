using Microsoft.EntityFrameworkCore;
using one.api.story;
using one.api.feature;
using one.api.option;
using one.api.optionValue;
using one.api.user;
using System;

namespace one.api.database
{
    public class OneContext : DbContext
    {

        public OneContext(DbContextOptions<OneContext> options) : base(options)
        {

        }

        public DbSet<story.Story> Stories { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<OptionValue> OptionValues  { get; set; }

        internal object Single(Func<object, object> p)
        {
            throw new NotImplementedException();
        }

        public DbSet<ApplicationUser> Users   { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<feature.Feature>().HasKey(x => new {x.Id, x.StoryId});
            modelBuilder.Entity<option.Option>().HasKey(x => new {x.Id, x.StoryId});
            
            modelBuilder.Entity<OptionValue>().HasOne(x => x.Feature)
                .WithMany(x => x.OptionValues)
                .HasForeignKey(x => new { x.FeatureId,x.StoryId })
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OptionValue>()
                .HasOne(x => x.Option).WithMany(x => x.OptionValues)
                .HasForeignKey(x => new { x.OptionId, x.StoryId}).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OptionValue>().HasOne(x => x.Story)
                .WithMany(x=>x.OptionValues)
                .HasForeignKey(x=>x.StoryId);
            modelBuilder.Entity<OptionValue>().HasKey(x => new {x.StoryId, x.FeatureId, x.OptionId, x.OptionValueType});

            modelBuilder.Entity<StoryUser>().HasKey(x => new {x.StoryId, x.UserId});

            modelBuilder.Entity<Story>().HasMany(x => x.Features);
        }
    }
}