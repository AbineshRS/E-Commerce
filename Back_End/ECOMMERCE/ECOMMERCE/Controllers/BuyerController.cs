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
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
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
            var emailexists = await _Ecommercecontext.Login.AnyAsync(a => a.Email == buyerDetails.Email);
            if (emailexists)
            {
                return Ok(new { success = false, message = "Email already exists." });
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
                Active = buyerDetails.Active,
                Email = buyerDetails.Email,
            };

            _Ecommercecontext.Login.Add(login);
            await _Ecommercecontext.SaveChangesAsync();

            return Ok(new { success = true, message = "Buyer registered successfully", buyerId = register.Id });
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
        public async Task<IActionResult> Update(int id, Buyer_register buyer_Register)
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
                        new Claim("usertype",details.Usertype),
                        new Claim("Status",details.Active)
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
        public async Task<IActionResult> Update(int id, [FromBody] BuyerDetails buyerDetails)
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
            MailMessage mail = new MailMessage();
            SmtpClient smtp = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress("smpsample4@gmail.com", "Ecommerce"); // Display name here
            mail.To.Add(data.Email);
            mail.Subject = "Purchase Confirmation";
            mail.IsBodyHtml = true;

            // Load image from local path and add as linked resource
            string imagePath = @"D:\E-Commerce\Back_End\ECOMMERCE\ECOMMERCE\EmailImage\2741840.jpg";
            LinkedResource inlineLogo = new LinkedResource(imagePath, MediaTypeNames.Image.Jpeg);
            inlineLogo.ContentId = "ecommerceLogo"; // Must match the cid in <img>

            // Build the HTML email body
            StringBuilder emailBody = new StringBuilder();

            emailBody.AppendLine($"<img src='cid:ecommerceLogo' alt='Ecommerce' style='max-width:200px;'><br/>");
            emailBody.AppendLine($"<h3>Dear {data.Username},</h3>");
            emailBody.AppendLine("<p>Thank you for your purchase! Here are your product details:</p>");
            emailBody.AppendLine("<table border='1' cellpadding='5' cellspacing='0' style='border-collapse:collapse;'>");
            emailBody.AppendLine("<tr><th>Product Name</th><th>Quantity</th><th>Amount</th></tr>");

            foreach (var product in buyer_Buyed_Product.product_Buyed_Details)
            {
                emailBody.AppendLine("<tr>");
                emailBody.AppendLine($"<td>{product.Productname}</td>");
                emailBody.AppendLine($"<td>{product.Quantity}</td>");
                emailBody.AppendLine($"<td>{product.Amount:C}</td>");
                emailBody.AppendLine("</tr>");
            }

            emailBody.AppendLine("</table>");
            emailBody.AppendLine("<p>We hope to serve you again soon.</p>");
            emailBody.AppendLine("<p>Best regards,<br/>E-commerce Team</p>");

            // Attach image to the email body
            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(emailBody.ToString(), null, MediaTypeNames.Text.Html);
            avHtml.LinkedResources.Add(inlineLogo);
            mail.AlternateViews.Add(avHtml);

            // SMTP setup
            smtp.Port = 587;
            smtp.Credentials = new System.Net.NetworkCredential("smpsample4@gmail.com", "yitv fxww unlv klrs");
            smtp.EnableSsl = true;
            smtp.Send(mail);



            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [HttpPost]
        [Route("addcart")]
        public async Task<IActionResult> addcart(Addcart addcart)
        {
            if (addcart == null)
            {
                return Ok(new { message = "No data found" });
            }
            var data = new Addcart
            {
                UserId = addcart.UserId,
                ProductId = addcart.ProductId,
                SellerId = addcart.SellerId,
                Username = addcart.Username,
                Email = addcart.Email,
                Productname = addcart.Productname,
                Productdescription = addcart.Productdescription,
                Quantity = addcart.Quantity,
                Amount = addcart.Amount,
                Address = addcart.Address,
                Status = addcart.Status,
            };
            _Ecommercecontext.Addcarts.Add(data);
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [HttpGet]
        [Route("addedcard/{id}")]
        public async Task<IActionResult> viewcard(int id)
        {
            if (id == null)
            {
                return Ok(new { message = "Not found" });
            }
            var data = await _Ecommercecontext.Addcarts.Where(a => a.UserId == id && a.Status == 1).ToListAsync();
            if (data.Count == 0)
            {
                return Ok(new { Message = "No data found" });
            }
            return Ok(data);
        }
        [HttpPut]
        [Route("updatecard")]
        public async Task<IActionResult> UpdateQuantitiesAndStatus([FromBody] List<Updateproducts> updates)
        {
            if (updates == null || !updates.Any())
            {
                return BadRequest("No update data provided.");
            }

            foreach (var item in updates)
            {
                var product = await _Ecommercecontext.AddProducts.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.Quantity -= item.Quantity;
                }

                var cart = await _Ecommercecontext.Addcarts
                            .FirstOrDefaultAsync(c => c.ProductId == item.ProductId && c.UserId == item.UserId); if (cart != null)
                {
                    cart.Status = item.Status;
                }
            }

            await _Ecommercecontext.SaveChangesAsync();

            return Ok("Product quantities and cart statuses updated successfully.");
        }
        [HttpPut]
        [Route("remove/{id}")]
        public async Task<IActionResult> removeaddcared(int id,CardDelete cardDelete)
        {
            if (id == null)
            {
                return Ok(new { message = "not found" });
            }
            var data = await _Ecommercecontext.Addcarts.Where(a => a.Id == id).FirstOrDefaultAsync();
            data.Status = cardDelete.Status;
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
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
            if (data == null || data.Count == 0)
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
                                     }).Distinct().OrderByDescending(a => a.Id).ToListAsync();
            if (userdeatils == null || userdeatils.Count == 0)
            {
                return BadRequest("Not found");
            }
            return Ok(userdeatils);
        }
        [HttpPost("resetpassword")]
        public async Task<IActionResult> SendResetLink([FromBody] ResetPasswordRequest request)
        {
            var user = await _Ecommercecontext.Login.FirstOrDefaultAsync(u => u.Email == request.Email);
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
                    {   new Claim("ID", user.Id.ToString()),

                        new Claim(ClaimTypes.Email, user.Email),
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

            MailMessage mail = new MailMessage();
            SmtpClient smtp = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress("smpsample4@gmail.com");
            mail.To.Add(user.Email);
            mail.Subject = "Reset Password";
            mail.Body = $@"
                        <html>
                        <body>
                         <p>Hello Your</p>
                         <p>You requested a password reset. Please click the link below:</p>
                         <p><a href='http://localhost:4000/resetpassword?token={jwt}'>Reset Password</a></p>
                         <p>If you didn't request this, you can safely ignore this email.</p>
                        </body>
                        </html>";
            mail.IsBodyHtml = true;

            smtp.Port = 587;
            smtp.Credentials = new System.Net.NetworkCredential("smpsample4@gmail.com", "yitv fxww unlv klrs");
            smtp.EnableSsl = true;
            smtp.Send(mail);

            return Ok("Reset link sent");
        }
        [HttpPatch]
        [Route("resetpassword/{id}")]
        public async Task<IActionResult> resetpassword(int id, string email, [FromBody] ChangePassword changePassword)
        {

            if (userdeatils == null)
            {
                return BadRequest("Not found");
            }
            var logindeatils = await _Ecommercecontext.Login.Where(a => a.Id == id && a.Email == email).FirstOrDefaultAsync();
            if (logindeatils == null)
            {
                return BadRequest("not found");
            }
            else
            {
                logindeatils.Username = changePassword.Username;
                logindeatils.Password = changePassword.Password;
            }
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(changePassword);
        }
        [HttpGet]
        [Route("buyerbuyed/{id}")]
        public async Task<IActionResult> buyerbuyedproduct(int id)
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
            if (data == null || data.Count == 0)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }


    }
}
