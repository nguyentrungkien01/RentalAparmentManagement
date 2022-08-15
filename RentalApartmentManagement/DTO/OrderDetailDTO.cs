using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class OrderDetailDTO
    {
        public DateTime? OrderDated { get; set; }
        public int MonthAmount { get; set; }
        public decimal? PriceTotal { get; set; }

        public  AccountDTO Account { get; set; }
        public  PostDTO Post { get; set; }
    }
}
