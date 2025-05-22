using Azure.Core;
using ECOMMERCE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

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
                Companyname = sellerDetails.Companyname,
                License = sellerDetails.License,
                Companyaddress = sellerDetails.Companyaddress,
                Ownername = sellerDetails.Ownername,
                Phonenumber = sellerDetails.Phonenumber,
                Email = sellerDetails.Email,
                Address = sellerDetails.Address,
            };
            _Ecommercecontext.seller_Registers.Add(register);
            await _Ecommercecontext.SaveChangesAsync();
            var existing = await _Ecommercecontext.Login.AnyAsync(a => a.Email == sellerDetails.Email);
            if (existing)
            {
                return Ok(new { success = false, message = "Email already exists." });

            }
            var login = new Login
            {
                UserId = register.Id,
                Username = sellerDetails.Username,
                Password = sellerDetails.Password,
                Usertype = sellerDetails.Usertype,
                Active = sellerDetails.Active,
                Email=sellerDetails.Email
            };
            _Ecommercecontext.Login.Add(login);
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(sellerDetails);
        }
        [HttpGet]
        [Route("userdeatils/{id}")]
        public async Task<IActionResult> getuserdeatils(int id)
        {
            if (id == null)
            {
                return BadRequest("not found");
            }
            var data = await _Ecommercecontext.seller_Registers.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("No data found");
            }
            return Ok(data);
        }
        [HttpPut]
        [Route("updateprofile/{id}")]
        public async Task<IActionResult> update(int id,[FromBody]Seller_register seller_Register)
        {
            if (id == null)
            {
                return BadRequest("not found");
            }
            var data = await _Ecommercecontext.seller_Registers.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("not found");
            }
            else
            {
                data.Companyname = seller_Register.Companyname;
                data.License = seller_Register.License;
                data.Companyaddress = seller_Register.Companyaddress;
                data.Ownername = seller_Register.Ownername;
                data.Phonenumber = seller_Register.Phonenumber;
                data.Email = seller_Register.Email;
                data.Address = seller_Register.Address;
            }
            await _Ecommercecontext.SaveChangesAsync();
            return Ok(data);
        }
        [Route("addproduct")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Addproducts([FromForm] AddProducts addProducts, IFormFile profilePicture)
        {
            if (addProducts == null)
            {
                return BadRequest("Not found");
            }

            if (profilePicture != null && profilePicture.Length > 0)
            {
                var userId = addProducts.UserId.ToString(); // assuming UserId exists in AddProducts
                var baseFolder = Path.Combine("Products", userId, "Images");

                // Create the directory if it doesn't exist
                if (!Directory.Exists(baseFolder))
                {
                    Directory.CreateDirectory(baseFolder);
                }

                var fileName = Path.GetFileName(profilePicture.FileName);
                var filePath = Path.Combine(baseFolder, fileName);

                // Save the image file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }

                // Convert file path to use forward slashes before saving into DB
                var dbPath = filePath.Replace("\\", "/");

                // Store the path in the database-friendly format
                addProducts.Picture = dbPath;
            }

            await _Ecommercecontext.AddProducts.AddAsync(addProducts);
            await _Ecommercecontext.SaveChangesAsync();

            return Ok(addProducts);
        }
        [HttpGet]
        [Authorize]
        [Route("productlist/{id}")]
        public async Task<IActionResult> getdata(int id)
        {
            if (id == 0)
            {
                return BadRequest("not found");
            }
            var data = await _Ecommercecontext.AddProducts.Where(a => a.UserId == id).OrderByDescending(a => a.Id).ToListAsync();
            if (data == null || !data.Any())
            {
                return NotFound("No products found for the given ID.");
            }
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        [Route("viewdetails/{id}")]
        public async Task<IActionResult> getdetails(int id)
        {
            if (id == null)
            {
               return BadRequest("not found");
            }
            var data = await _Ecommercecontext.AddProducts.Where(a=>a.Id==id).FirstOrDefaultAsync();
            return Ok(data);
        }
        [HttpPut]
        [Route("update/{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromForm] AddProducts addProducts, IFormFile? formFile)
        {
            var existing = await _Ecommercecontext.AddProducts.FindAsync(id);
            if (existing == null)
            {
                return BadRequest("Product not found");
            }

            // Update other fields
            existing.Productname = addProducts.Productname;
            existing.Productdescription = addProducts.Productdescription;
            existing.Category = addProducts.Category;
            existing.Spesification = addProducts.Spesification;
            existing.Amount = addProducts.Amount;
            existing.Quantity = addProducts.Quantity;

            if (formFile != null && formFile.Length > 0)
            {
                // Delete the old image file if it exists
                if (!string.IsNullOrEmpty(existing.Picture))
                {
                    var oldImagePath = existing.Picture.Replace("/", "\\"); // convert to Windows path format
                    var fullOldPath = Path.Combine(Directory.GetCurrentDirectory(), oldImagePath);

                    if (System.IO.File.Exists(fullOldPath))
                    {
                        System.IO.File.Delete(fullOldPath);
                    }
                }

                var userId = existing.UserId.ToString(); // Make sure UserId is passed correctly
                var baseFolder = Path.Combine("Products",userId, "Images");

                // Ensure the directory exists
                if (!Directory.Exists(baseFolder))
                {
                    Directory.CreateDirectory(baseFolder);
                }

                var fileName = Path.GetFileName(formFile.FileName);
                var filePath = Path.Combine(baseFolder, fileName);

                // Save the new image
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(stream);
                }

                // Store forward-slash path for DB
                var dbPath = filePath.Replace("\\", "/");

                // Update DB with new image path
                existing.Picture = dbPath;
            }

            await _Ecommercecontext.SaveChangesAsync();
            return Ok(existing);
        }


    }
}
