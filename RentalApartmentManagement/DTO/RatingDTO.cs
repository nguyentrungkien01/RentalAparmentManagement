using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class RatingDTO
    {
        public int RateAmount { get; set; }

        public  AccountDTO Account { get; set; }
        public  PostDTO Post { get; set; }
    }
}
