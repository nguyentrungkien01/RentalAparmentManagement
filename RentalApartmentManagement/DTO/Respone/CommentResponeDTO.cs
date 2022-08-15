using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
   public  class CommentResponeDTO
    {
        public string Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public AccountResponeDTO Account { get; set; }
        public PostResponeDTO Post { get; set; }
    }
}
