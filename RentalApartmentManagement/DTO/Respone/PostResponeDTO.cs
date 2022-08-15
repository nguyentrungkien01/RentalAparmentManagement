using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
    public class PostResponeDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal? PricePerMonth { get; set; }
        public string Address { get; set; }
        public int? LikeAmount { get; set; }
        public int? Status { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public DateTime? DateCreated { get; set; }
        public AccountResponeDTO Account { get; set; }

        public List<CommentResponeDTO> Comment { get; set; }
        public List<ImageResponeDTO> Image { get; set; }
        public List<OrderDetailResponeDTO> OrderDetail { get; set; }
        public List<RatingResponeDTO> Rating { get; set; }
    }
}
