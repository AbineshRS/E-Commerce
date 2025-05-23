using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ECOMMERCE.Models
{
    public class EcommerceDbContext:DbContext
    {
        public EcommerceDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Buyer_register> Buyer_register { get; set;}
        public DbSet<Login> Login { get; set;}
        public DbSet<Seller_register> seller_Registers { get; set;}
        public DbSet<AddProducts> AddProducts { get; set;}
        public DbSet<Buyer_buyed_product> Buyer_Buyed_Products { get; set;}
        public DbSet<Product_buyed_details> Product_Buyed_Details { get; set;}
        public DbSet<Addcart> Addcarts { get; set;}

    }
}
