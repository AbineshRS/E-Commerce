using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECOMMERCE.Migrations
{
    /// <inheritdoc />
    public partial class addss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Usertype",
                table: "Add",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Usertype",
                table: "Add");
        }
    }
}
