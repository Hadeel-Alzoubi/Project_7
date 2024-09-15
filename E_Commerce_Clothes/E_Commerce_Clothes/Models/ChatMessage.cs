using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace E_Commerce_Clothes.Models;

public partial class ChatMessage
{
    public int ChatMessagesId { get; set; }

    public int? ChatId { get; set; }

    public string? Cmessages { get; set; }

    public int? Flag { get; set; }

    [JsonIgnore]
    public virtual Chat? Chat { get; set; }
}
