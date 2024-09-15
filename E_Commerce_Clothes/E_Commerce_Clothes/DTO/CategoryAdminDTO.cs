using E_Commerce_Clothes.Models;

namespace E_Commerce_Clothes.DTOs
{
    public class CategoryRequestDTO
    {

        public string? Name { get; set; }

        public IFormFile? Image { get; set; }

        public string? Description { get; set; }


    }
}
