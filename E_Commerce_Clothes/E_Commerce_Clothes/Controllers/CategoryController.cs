using E_Commerce_Clothes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_Clothes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly MyDbContext _dbContext;
        public CategoryController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAllCategory")]
        public IActionResult GetAllCategory()
        {
            var AllCategory = _dbContext.Categories.ToList();

            if (!AllCategory.Any())
            {
                return NotFound("No categories found.");
            }

            return Ok(AllCategory);
        }
    }
}
