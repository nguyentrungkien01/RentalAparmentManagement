using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class CommentRequestDTO
    {
        public string Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public int AccountId { get; set; }
        public int PostId { get; set; }
    }
}
