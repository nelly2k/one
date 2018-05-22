using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace one.web.Migrations
{
    public partial class Storytovalue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OptionValues_StoryId",
                table: "OptionValues",
                column: "StoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionValues_Stories_StoryId",
                table: "OptionValues",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionValues_Stories_StoryId",
                table: "OptionValues");

            migrationBuilder.DropIndex(
                name: "IX_OptionValues_StoryId",
                table: "OptionValues");
        }
    }
}
