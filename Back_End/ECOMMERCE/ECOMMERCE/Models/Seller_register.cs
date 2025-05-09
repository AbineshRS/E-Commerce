using System.ComponentModel.DataAnnotations;

namespace ECOMMERCE.Models
{
    public class Seller_register
    {
        [Key]
        public int Id { get; set; }
        public string Companyname { get; set; }
        public string License { get; set; }
        public string Companyaddress { get; set; }
        public string Ownername { get; set; }
        public string Phonenumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }



    }
}
