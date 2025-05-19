namespace ECOMMERCE.Models
{
    public class AddProducts
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Productname { get; set; }
        public string Productdescription { get; set; }
        public string Category { get; set; }
        public string Spesification { get; set; }
        public string Amount { get; set; }
        public string? Picture { get; set; }
        public int Quantity { get; set; }
    }
}
