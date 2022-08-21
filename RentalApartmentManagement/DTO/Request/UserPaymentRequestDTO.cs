using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTO.Request
{
    public class UserPaymentRequestDTO: IBaseRequest
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}
