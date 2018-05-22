using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace one.web.Migrations
{
    public partial class Featureorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Features",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Features");
        }
    }
}
