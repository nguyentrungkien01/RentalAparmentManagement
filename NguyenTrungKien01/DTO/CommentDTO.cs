using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class CommentDTO
    {
        public string Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public AccountDTO Account { get; set; }
        public PostDTO Post { get; set; }
    }
}
