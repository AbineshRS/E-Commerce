namespace ECOMMERCE.Models
{
    public class Addcart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Productname { get; set; }
        public string Productdescription { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string Address { get; set; }
        public int Status { get; set; }
    }
}
