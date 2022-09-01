using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class ViewApartmentRequestDTO:IBaseRequest
    {
        public string Address { get; set; }
        public decimal? FromPrice { get; set; }
        public decimal? ToPrice { get; set; }
        public ViewApartmentRequestDTO ()
        {
            FromPrice = 0;
            ToPrice = 0;
            Address = "";
        }
    }
}
