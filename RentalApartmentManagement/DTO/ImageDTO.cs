using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string Path { get; set; }

        public PostDTO Post { get; set; }
    }
}
