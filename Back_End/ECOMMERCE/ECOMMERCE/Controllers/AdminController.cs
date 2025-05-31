using ECOMMERCE.DTO;
using ECOMMERCE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECOMMERCE.Controllers
{
    [Route("admin/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EcommerceDbContext _Ecommercecontext;
        public AdminController(EcommerceDbContext context)
        {
            _Ecommercecontext = context;
        }
        [HttpGet]
        [Route("getseller")]
        public async Task<IActionResult> getsellerdetails()
        {
            var data = await (from seller in _Ecommercecontext.seller_Registers
                              join login in _Ecommercecontext.Login
                              on seller.Id equals login.UserId
                              where (login.Usertype == "Seller")
                              select new
                              {
                                  login.Id,
                                  seller.Email,
                                  seller.Ownername,
                                  seller.Phonenumber,
                                  seller.Companyaddress,
                                  seller.License,
                                  login.Active
                              }).ToListAsync();
            return Ok(data);
        }
        [HttpPut]
        [Route("sellerupdate/{id}")]
        public async Task<IActionResult> updateseller(int id, Status status)
        {
            if (id == 0)
            {
                return Ok(new { message = "Not found" });
            }
            var data = await _Ecommercecontext.Login.Where(a => a.Id == id && a.Usertype == "Seller").FirstOrDefaultAsync();
            if (data == null)
            {
                return Ok(new { message = "Not found" });
            }
            data.Active = status.Active;
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [HttpGet]
        [Route("getbuyer")]
        public async Task<IActionResult> getbuyerdeatils()
        {
            var data = await (from buyer in _Ecommercecontext.Buyer_register
                              join login in _Ecommercecontext.Login
                              on buyer.Id equals login.UserId
                              where (login.Usertype == "Buyer")
                              select new
                              {
                                  login.Id,
                                  buyer.Email,
                                  buyer.DOB,
                                  FullName = buyer.FirstName + " " + buyer.LastName,
                                  buyer.Gender,
                                  login.Active
                              }).ToListAsync();
            return Ok(data);
        }
        [HttpPut]
        [Route("buyerupdate/{id}")]
        public async Task<IActionResult> updatebuyer(int id, Status status)
        {
            if (id == 0)
            {
                return Ok(new { message = "Not found" });
            }
            var data = await _Ecommercecontext.Login.Where(a => a.Id == id && a.Usertype == "Buyer").FirstOrDefaultAsync();
            if (data == null)
            {
                return Ok(new { message = "Not found" });
            }
            data.Active = status.Active;
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
    }
}
