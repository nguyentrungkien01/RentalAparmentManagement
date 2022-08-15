using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class PostRequestDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal? PricePerMonth { get; set; }
        public string Address { get; set; }
        public int? Status { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public DateTime? DateCreated { get; set; }
        public int AccountId { get; set; }
        public List<string> Image { get; set; }
    }
}
