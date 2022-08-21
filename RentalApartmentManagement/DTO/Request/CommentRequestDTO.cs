using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace DTO.Request
{
    public class CommentRequestDTO : IBaseRequest
    {
        public string Content { get; set; }
        public int PostId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
