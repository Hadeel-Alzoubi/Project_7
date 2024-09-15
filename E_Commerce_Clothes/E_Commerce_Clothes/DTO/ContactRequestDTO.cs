namespace E_Commerce_Clothes.DTO
{
    public class ContactRequestDTO
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Subject { get; set; }

        public string? Message { get; set; }
    }
}
