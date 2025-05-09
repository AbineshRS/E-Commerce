using System.ComponentModel.DataAnnotations;

namespace ECOMMERCE.Models
{
    public class Add
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Usertype { get; set; }
    }
}
