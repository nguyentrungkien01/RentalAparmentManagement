using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace DTO.Request
{
    public class UserDetailRequestDTO : IBaseRequest
    {
        public ClaimsIdentity Identity { get; set; }
        public string PhoneNumber { get; set; }
    }
}
