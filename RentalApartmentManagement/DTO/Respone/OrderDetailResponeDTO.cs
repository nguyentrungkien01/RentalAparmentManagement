using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
   public class OrderDetailResponeDTO
    {
        public DateTime? OrderDated { get; set; }
        public int MonthAmount { get; set; }
        public decimal? PriceTotal { get; set; }
        public AccountResponeDTO Account { get; set; }
        public PostResponeDTO Post { get; set; }
    }
}
