using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECOMMERCE.Migrations
{
    /// <inheritdoc />
    public partial class ops : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Buyer_register",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DOB",
                table: "Buyer_register",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Buyer_register",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Buyer_register",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phonenumber",
                table: "Buyer_register",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Buyer_register");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "Buyer_register");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Buyer_register");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Buyer_register");

            migrationBuilder.DropColumn(
                name: "Phonenumber",
                table: "Buyer_register");
        }
    }
}
