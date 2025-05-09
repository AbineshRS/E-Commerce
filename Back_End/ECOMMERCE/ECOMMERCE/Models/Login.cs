using System.ComponentModel.DataAnnotations;

namespace ECOMMERCE.Models
{
    public class Login
    {
        [Key]
        public int Id{ get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Usertype { get; set; }
        public string Active { get; set; }
    }
}
