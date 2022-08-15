using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Entity
{
    public partial class Account
    {
        public Account()
        {
            Comment = new HashSet<Comment>();
            OrderDetail = new HashSet<OrderDetail>();
            Post = new HashSet<Post>();
            Rating = new HashSet<Rating>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IdCard { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? Status { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
        public virtual ICollection<Post> Post { get; set; }
        public virtual ICollection<Rating> Rating { get; set; }
    }
}
