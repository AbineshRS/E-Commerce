namespace ECOMMERCE.Models
{
    public class Product_buyed_details
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Productname { get; set; }
        public string Productdescription { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string Address { get; set; }

    }
}
