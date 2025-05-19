namespace ECOMMERCE.Models
{
    public class Buyer_buyed_product
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public  List<Product_buyed_details> product_Buyed_Details { get;set; }
        
    }
}
