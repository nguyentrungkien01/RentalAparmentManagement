using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTO.Request
{
    public class OrderDetailRequestDTO : IBaseRequest
    {
        public int PostId { get; set; }
        public int MonthAmount { get; set; }
        public decimal PriceTotal { get; set; }
    }
}
