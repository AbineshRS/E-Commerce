using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ECOMMERCE.Models
{
    public class EcommerceDbContext:DbContext
    {
        public EcommerceDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Buyer_register> Buyer_register { get; set;}
        public DbSet<Login> Login { get; set;}
        public DbSet<Add> Add { get; set;}
        public DbSet<Seller_register> seller_Registers { get; set;}
        public DbSet<AddProducts> AddProducts { get; set;}
    }
}
