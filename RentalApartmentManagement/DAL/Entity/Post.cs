using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Entity
{
    public partial class Post
    {
        public Post()
        {
            Comment = new HashSet<Comment>();
            Image = new HashSet<Image>();
            OrderDetail = new HashSet<OrderDetail>();
            Rating = new HashSet<Rating>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal? PricePerMonth { get; set; }
        public string Address { get; set; }
        public int? LikeAmount { get; set; }
        public int? Status { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string Slug { get; set; }
        public DateTime? DateCreated { get; set; }
        public int AccountId { get; set; }

        public virtual Account Account { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Image> Image { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
        public virtual ICollection<Rating> Rating { get; set; }
    }
}
