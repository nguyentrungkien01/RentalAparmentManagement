using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTO.Request
{
    public class PaymentRequestDTO : IBaseRequest
    {
        public List<OrderDetailRequestDTO> OrderDetails { get; set; }

        [JsonIgnore]
        public int AccountId { get; set; }
    }
}
