namespace E_Commerce_Clothes.DTOs
{
    public interface IEmailService
    {
            void SendEmail(string to, string subject, string body);

    }
}
