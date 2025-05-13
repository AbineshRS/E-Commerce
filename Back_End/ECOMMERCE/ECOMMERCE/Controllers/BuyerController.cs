using ECOMMERCE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        [Route("login")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string username, string password)
        {
            var details = await _Ecommercecontext.Login.FirstOrDefaultAsync(s => s.Username == username && s.Password == password);

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
                        new Claim("ID", details.Id.ToString()),
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
        public async Task<IActionResult> Update(int id,BuyerDetails buyerDetails)
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
            var data= await _Ecommercecontext.AddProducts.ToListAsync();
            return Ok(data);
        }
    }
}
