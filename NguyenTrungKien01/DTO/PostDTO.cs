using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
   public  class PostDTO
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
        public AccountDTO Account { get; set; }

        public List<CommentDTO> Comment { get; set; }
        public List<ImageDTO> Image { get; set; }
        public List<OrderDetailDTO> OrderDetail { get; set; }
        public List<RatingDTO> Rating { get; set; }
    }
}
