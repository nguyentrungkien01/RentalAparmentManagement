using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
    public class BaseResponse
    {
        public object Data { get; set; }
        public string Message { get; set; }
        public int code { get; set; }
    }
}
