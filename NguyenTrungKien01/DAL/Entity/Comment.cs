using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
   public  class Comment
    {
        int accountId { get; set; }
        int postId { get; set; }
        string content { get; set; }
        DateTime dateCreated { get; set; }
    }
}
