using System;
using System.Collections.Generic;

namespace E_Commerce_Clothes.Models;

public partial class ChatMessage1
{
    public int Id { get; set; }

    public string? Sender { get; set; }

    public string? Recipient { get; set; }

    public string? MessageContent { get; set; }

    public DateTime? SentAt { get; set; }
}
