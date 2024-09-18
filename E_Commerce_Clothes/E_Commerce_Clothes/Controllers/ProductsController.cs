using E_Commerce_Clothes.DTO;
using E_Commerce_Clothes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_Clothes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        public ProductsController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _dbContext.Products.ToList();
            if (!products.Any()) { return NotFound("No product found."); }
            return Ok(products);
        }
        [HttpGet("GetProductByID/{id}")]
        public IActionResult GetProductByID(int id)
        {
            if (id <= 0) { return BadRequest(); }
            var product = _dbContext.Products.Find(id);
            if (product == null) { return NotFound("No product found."); }




            return Ok(product);
        }

        [HttpGet("GetProductByIDStars/{id}")]
        public IActionResult GetProductByIDStars(int id)
        {
            if (id <= 0) { return BadRequest(); }
            var product = _dbContext.Products.Find(id);
            if (product == null) { return NotFound("No product found."); }

            var checkComment = _dbContext.Comments.Where(p => p.ProductId == id);

            var stars = 0;
            if (checkComment != null && checkComment.Any())
            {
                stars = checkComment.Sum(p => p.Rating ?? 0) / checkComment.Count();
            }

            return Ok(new { product, stars });
        }

        [HttpGet("GetProductByCategoryID{id:int}")]
        public IActionResult GetProductByCategoryID(int id)
        {
            if (id <= 0) { return BadRequest(); }
            var products = _dbContext.Products.Where(p => p.CategoryId == id).ToList();
            if (!products.Any()) { return NotFound(); }
            return Ok(products);
        }
        [HttpGet("GetBrandCount")]
        public ActionResult<IEnumerable<BrandCountDto>> GetBrandCount()
        {
            var brandCounts = _dbContext.Products
                .Where(p => p.Brand != null)
                .GroupBy(p => p.Brand)
                .Select(group => new BrandCountDto
                {
                    BrandName = group.Key,
                    ProductCount = group.Count()
                })
                .ToList();

            return Ok(brandCounts);
        }
        [HttpGet("GetProductByBrand/{name}")]
        public IActionResult GetProductByBrand(string name)
        {
            if (name == null) { return BadRequest("no product under this Brand"); }
            var product = _dbContext.Products.Where(p => p.Brand == name).ToList();
            if (!product.Any())
            {
                return NotFound();
            }
            return Ok(product);

        }
        [HttpGet("FilterByPrice")]
        public async Task<IActionResult> FilterByPrice(decimal minPrice, decimal maxPrice)
        {
            if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
            {
                return BadRequest("Invalid price range.");
            }
            var filteredProducts = await _dbContext.Products
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToListAsync();


            if (filteredProducts == null || filteredProducts.Count == 0)
            {
                return NotFound("No products found within the specified price range.");
            }

            return Ok(filteredProducts);
        }

        [HttpGet("FilterByPriceHighToLow")]
        public async Task<IActionResult> FilterByPriceHighToLow()
        {
            var order = _dbContext.Products.OrderByDescending(p => p.Price);
            if (order == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(order);
            }
        }


        [HttpGet("FilterByPriceLowToHigh")]
        public async Task<IActionResult> FilterByPriceLowToHigh()
        {
            var order = _dbContext.Products.OrderBy(p => p.Price);
            if (order == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(order);
            }
        }


        [HttpGet("FilterByName")]
        public async Task<IActionResult> FilterByName()
        {
            var order = _dbContext.Products.OrderBy(p => p.Name);
            if (order == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(order);
            }
        }
    }
}
