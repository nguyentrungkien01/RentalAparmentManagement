using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Image
    {
        int id { get; set; }
        int postId { get; set; }
        string path { get; set; }
    }
}
