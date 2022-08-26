using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class StatisticRequestDTO : IBaseRequest
    {
        public int Amount { get; set; }
    }
}
