using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class UserDeleteRequestDTO : IBaseRequest
    {
        public int id { get; set; }
    }
}
