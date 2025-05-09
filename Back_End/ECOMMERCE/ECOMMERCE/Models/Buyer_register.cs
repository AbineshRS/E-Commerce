using System.ComponentModel.DataAnnotations;

namespace ECOMMERCE.Models
{
    public class Buyer_register
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DOB { get; set; }
        public string Phonenumber { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }

    }
}
