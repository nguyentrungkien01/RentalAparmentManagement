using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class UserDetailRequestDTO : IBaseRequest
    {
        public string PhoneNumber { get; set; }
    }
}
