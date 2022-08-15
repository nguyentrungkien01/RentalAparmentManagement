using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class RatingRequestDTO
    {
        public int RateAmount { get; set; }
        public int AccountId { get; set; }
        public int PostId { get; set; }
    }
}
