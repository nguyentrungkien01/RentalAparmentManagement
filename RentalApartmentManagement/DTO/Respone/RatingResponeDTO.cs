using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
    public class RatingResponeDTO
    {
        public int RateAmount { get; set; }
        public AccountResponeDTO Account { get; set; }
        public PostResponeDTO Post { get; set; }
    }
}
