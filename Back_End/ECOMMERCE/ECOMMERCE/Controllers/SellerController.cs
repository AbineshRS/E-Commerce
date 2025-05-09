using ECOMMERCE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECOMMERCE.Controllers
{
    [Route("Seller/[controller]")]
    [ApiController]

    public class SellerController : ControllerBase
    {
        private readonly EcommerceDbContext _Ecommercecontext;

        public SellerController(EcommerceDbContext ecommerceDbContext)
        {
            _Ecommercecontext = ecommerceDbContext;
        }
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> SellerAdd([FromBody] SellerDetails sellerDetails)
        {
            if (sellerDetails == null)
            {
                return BadRequest("not found");
            }

            var register = new Seller_register
            {
                Companyname=sellerDetails.Companyname,
                License=sellerDetails.License,
                Companyaddress=sellerDetails.Companyaddress,
                Ownername=sellerDetails.Ownername,
                Phonenumber=sellerDetails.Phonenumber,
                Email=sellerDetails.Email,
                Address=sellerDetails.Address,
            };
            _Ecommercecontext.seller_Registers.Add(register);
            await _Ecommercecontext.SaveChangesAsync();
            var login = new Login
            {
                UserId = register.Id,
                Username = sellerDetails.Username,
                Password = sellerDetails.Password,
                Usertype = sellerDetails.Usertype,
                Active = sellerDetails.Active,
            };
            _Ecommercecontext.Login.Add(login);
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(sellerDetails);
        }
    }
}
