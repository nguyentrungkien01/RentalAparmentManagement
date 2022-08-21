using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class MomoRequestDTO : IBaseRequest
    {
        public decimal TotalMoney { get; set; }
        public string OrderInfo { get; set; }

        public string NotifyUrl { get; set; }

        public string ReturnUrl { get; set; }

        public List<ItemPaymentRequestDTO> Items { get; set; }

        public UserPaymentRequestDTO UserInfo { get; set; }

    }
}
