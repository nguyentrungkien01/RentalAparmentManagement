using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class SignInRequestDTO : IBaseRequest
    {
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }
}
