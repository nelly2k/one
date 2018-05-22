﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using one.api.database;
using one.api.feature;
using one.api.optionValue;
using one.api.story;
using System;

namespace one.web.Migrations
{
    [DbContext(typeof(OneContext))]
    [Migration("20180314084230_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("one.api.feature.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("StoryId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("FeatureNumberOption");

                    b.Property<bool>("IsNumber");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedDate");

                    b.HasKey("Id", "StoryId");

                    b.HasIndex("StoryId");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("one.api.option.Option", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("StoryId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedDate");

                    b.HasKey("Id", "StoryId");

                    b.HasIndex("StoryId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("one.api.optionValue.OptionValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("StoryId");

                    b.Property<int>("FeatureId");

                    b.Property<int>("OptionId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("OptionValueType");

                    b.Property<int>("Order");

                    b.Property<DateTime>("UpdatedDate");

                    b.Property<string>("Value");

                    b.HasKey("Id", "StoryId", "FeatureId", "OptionId");

                    b.HasIndex("FeatureId", "StoryId");

                    b.HasIndex("OptionId", "StoryId");

                    b.ToTable("OptionValues");
                });

            modelBuilder.Entity("one.api.story.Story", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Stories");
                });

            modelBuilder.Entity("one.api.story.StoryUser", b =>
                {
                    b.Property<Guid>("StoryId");

                    b.Property<Guid>("UserId");

                    b.Property<int>("AccessType");

                    b.HasKey("StoryId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("StoryUser");
                });

            modelBuilder.Entity("one.api.user.ApplicationUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail");

                    b.Property<string>("NormalizedUserName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("one.api.feature.Feature", b =>
                {
                    b.HasOne("one.api.story.Story", "Story")
                        .WithMany("Features")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("one.api.option.Option", b =>
                {
                    b.HasOne("one.api.story.Story", "Story")
                        .WithMany("Options")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("one.api.optionValue.OptionValue", b =>
                {
                    b.HasOne("one.api.feature.Feature", "Feature")
                        .WithMany("OptionValues")
                        .HasForeignKey("FeatureId", "StoryId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("one.api.option.Option", "Option")
                        .WithMany("OptionValues")
                        .HasForeignKey("OptionId", "StoryId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("one.api.story.StoryUser", b =>
                {
                    b.HasOne("one.api.story.Story", "Story")
                        .WithMany("Users")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("one.api.user.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
