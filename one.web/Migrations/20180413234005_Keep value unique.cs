using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace one.web.Migrations
{
    public partial class Keepvalueunique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OptionValues",
                table: "OptionValues");

            migrationBuilder.DropIndex(
                name: "IX_OptionValues_StoryId",
                table: "OptionValues");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OptionValues",
                table: "OptionValues",
                columns: new[] { "StoryId", "FeatureId", "OptionId", "OptionValueType" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OptionValues",
                table: "OptionValues");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OptionValues",
                table: "OptionValues",
                columns: new[] { "Id", "StoryId", "FeatureId", "OptionId" });

            migrationBuilder.CreateIndex(
                name: "IX_OptionValues_StoryId",
                table: "OptionValues",
                column: "StoryId");
        }
    }
}
