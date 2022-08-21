using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DTO.Request
{
    public class PostCreateRequestDTO : IBaseRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal? PricePerMonth { get; set; }
        public string Address { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public int AccountId { get; set; }
        public List<IFormFile> formFiles;
    }
}
