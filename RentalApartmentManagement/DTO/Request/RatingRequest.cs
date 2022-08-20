using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class RatingRequest : IBaseRequest
    {
        public int PostId { get; set; }
        public int RateAmount { get; set; }
        public string PhoneNumber { get; set; }
    }
}
