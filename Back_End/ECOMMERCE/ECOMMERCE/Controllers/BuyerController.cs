using ECOMMERCE.DTO;
using ECOMMERCE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;

namespace ECOMMERCE.Controllers
{
    [Route("Ecommerce/[controller]")]
    [ApiController]
    public class BuyerController : ControllerBase
    {
        private readonly EcommerceDbContext _Ecommercecontext;
        private readonly IConfiguration _configuration;
        public BuyerController(EcommerceDbContext ecommerceDbContext, IConfiguration configuration)
        {
            _Ecommercecontext = ecommerceDbContext;
            _configuration = configuration;
        }


        [Route("buyer")]
        [HttpPost]
        public async Task<IActionResult> Addetails([FromBody] BuyerDetails buyerDetails)
        {
            if (buyerDetails == null)
            {
                return BadRequest("Invalid data.");
            }

            var register = new Buyer_register
            {
                FirstName = buyerDetails.FirstName,
                LastName = buyerDetails.LastName,
                DOB = buyerDetails.DOB,
                Phonenumber = buyerDetails.Phonenumber,
                Email = buyerDetails.Email,
                Gender = buyerDetails.Gender,
                Address = buyerDetails.Address,
            };

            _Ecommercecontext.Buyer_register.Add(register);
            await _Ecommercecontext.SaveChangesAsync();

            var login = new Login
            {
                UserId = register.Id,
                Username = buyerDetails.Username,
                Password = buyerDetails.Password,
                Usertype = buyerDetails.Usertype,
                Active = buyerDetails.Active
            };

            _Ecommercecontext.Login.Add(login);
            await _Ecommercecontext.SaveChangesAsync();

            return Ok(new { message = "Buyer registered successfully", buyerId = register.Id });
        }
        [HttpGet]
        [Route("userdetails/{id}")]
        public async Task<IActionResult> userdeatils(int id)
        {
            if (id == null)
            {
                return BadRequest("not fonud");
            }
            var data = await _Ecommercecontext.Buyer_register.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }
        [HttpPut]
        [Route("Buyerupdate/{id}")]
        public async Task<IActionResult> Update(int id,Buyer_register buyer_Register)
        {
            if (id == null)
            {
                return BadRequest("Not found");
            }
            var data = await _Ecommercecontext.Buyer_register.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            else
            {
                data.FirstName = buyer_Register.FirstName;
                data.LastName = buyer_Register.LastName;
                data.DOB = buyer_Register.DOB;
                data.Phonenumber = buyer_Register.Phonenumber;
                data.Email = buyer_Register.Email;
                data.Gender = buyer_Register.Gender;
                data.Address = buyer_Register.Address;
            }
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [Route("login")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string username, string password)
        {
            var details = await _Ecommercecontext.Login
                .FirstOrDefaultAsync(s =>
                    EF.Functions.Collate(s.Username, "SQL_Latin1_General_CP1_CS_AS") == username &&
                    EF.Functions.Collate(s.Password, "SQL_Latin1_General_CP1_CS_AS") == password);

            if (details == null)
            {
                return NotFound("User not found");
            }
            else
            {
                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));

                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, details.Username),
                        new Claim("ID", details.UserId.ToString()),
                         new Claim(ClaimTypes.Role, details.Usertype),
                        new Claim("usertype",details.Usertype)
                    };

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = credentials
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwt = tokenHandler.WriteToken(token);

                return Ok(new { token = jwt });
            }
        }
        [HttpPut]
        [Authorize]
        [Route("update")]
        public async Task<IActionResult> Update(int id, BuyerDetails buyerDetails)
        {
            var details = await _Ecommercecontext.Buyer_register.FindAsync(id);
            if (details == null)
            {
                return BadRequest("Buyer not found");
            }
            else
            {
                details.FirstName = buyerDetails.FirstName;
                details.LastName = buyerDetails.LastName;
                details.DOB = buyerDetails.DOB;
                details.Phonenumber = buyerDetails.Phonenumber;
                details.Email = buyerDetails.Email;
                details.Address = buyerDetails.Address;
                details.FirstName = buyerDetails.FirstName;
            }
            var userdetails = await _Ecommercecontext.Login.Where(a => a.UserId == id).FirstOrDefaultAsync();
            if (userdetails == null)
            {
                return BadRequest("not found");
            }
            else
            {
                userdetails.Username = buyerDetails.Username;
                userdetails.Password = buyerDetails.Password;
            }
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(buyerDetails);

        }
        [HttpGet]
        [Route("getproduct")]
        public async Task<IActionResult> getdata()
        {
            var data = await _Ecommercecontext.AddProducts.ToListAsync();
            return Ok(data);
        }
        [HttpGet]
        [Route("getproductimage")]
        public async Task<IActionResult> getimg()
        {
            var data = await _Ecommercecontext.AddProducts.OrderByDescending(a => a.Id).Take(3).Select(a => new { a.Id, a.Category, a.Picture, a.Productname, a.Productdescription }).ToListAsync();
            return Ok(data);
        }
        [HttpGet]
        [Route("getdetails/{id}")]
        public async Task<IActionResult> getdetails(int id)
        {
            if (id == null)
            {
                return BadRequest("Not found");
            }

            var data = await _Ecommercecontext.AddProducts.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }
        [HttpGet]
        [Route("userid/{id}")]
        public async Task<IActionResult> getdata(int id)
        {
            if (id == null)
            {
                return BadRequest("not found");
            }
            var data = await _Ecommercecontext.Buyer_register.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }
        [HttpPost]
        [Route("buyerbuyed")]
        public async Task<IActionResult> buyerbuyed([FromBody] Buyer_buyed_product buyer_Buyed_Product)
        {
            if (buyer_Buyed_Product == null)
            {
                return BadRequest("Please Enter data");
            }
            var data = new Buyer_buyed_product
            {
                UserId = buyer_Buyed_Product.UserId,
                ProductId = buyer_Buyed_Product.ProductId,
                SellerId = buyer_Buyed_Product.SellerId,
                Username = buyer_Buyed_Product.Username,
                Email = buyer_Buyed_Product.Email,

            };
            _Ecommercecontext.Buyer_Buyed_Products.Add(data);
            await _Ecommercecontext.SaveChangesAsync();

            foreach (var product in buyer_Buyed_Product.product_Buyed_Details)
            {
                var data2 = new Product_buyed_details
                {
                    ParentId = data.Id,
                    Productname = product.Productname,
                    Productdescription = product.Productdescription,
                    Quantity = product.Quantity,
                    Amount = product.Amount,
                    Address = product.Address,
                };
                _Ecommercecontext.Product_Buyed_Details.Add(data2);
            }
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Updatequnatity(int id, [FromBody] AddProducts addProducts)
        {
            if (id == null)
            {
                return BadRequest("not found");
            }
            var data = await _Ecommercecontext.AddProducts.FindAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            else
            {
                data.Quantity -= addProducts.Quantity;
                await _Ecommercecontext.SaveChangesAsync();
            }
            return Ok(data.Quantity);
        }
        [HttpGet]
        [Authorize(Roles = "Seller")]
        [Route("product/{id}")]
        public async Task<IActionResult> productdeatils(int id)
        {
            if (id == null)
            {
                return BadRequest("id not found");
            }
            var data = await (from buy in _Ecommercecontext.Buyer_Buyed_Products
                              join prod in _Ecommercecontext.AddProducts
                              on buy.ProductId equals prod.Id
                              where buy.SellerId == id
                              select prod).Distinct().ToListAsync();
            if (data == null|| data.Count==0)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("getdata/{id}")]
        public async Task<IActionResult> getproduct(int id)
        {
            if (id == null)
            {
                return BadRequest("Not id found");
            }
            var userdeatils = await (from buy in _Ecommercecontext.Buyer_Buyed_Products
                                     join prod in _Ecommercecontext.Product_Buyed_Details
                                     on buy.Id equals prod.ParentId
                                     where buy.ProductId == id
                                     select new
                                     {
                                         buy.Id,
                                         buy.Username,
                                         buy.Email,
                                         prod.Amount,
                                         prod.Quantity,
                                         prod.Address
                                     }).Distinct().OrderByDescending(a=>a.Id).ToListAsync();
            if(userdeatils==null || userdeatils.Count == 0)
            {
                return BadRequest("Not found");
            }
            return Ok(userdeatils);
        }
    }
}
