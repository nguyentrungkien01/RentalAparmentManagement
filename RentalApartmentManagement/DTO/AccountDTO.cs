using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class AccountDTO
    {
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
        public RoleDTO Role { get; set; }
        public List<CommentDTO> Comment { get; set; }
        public List<OrderDetailDTO> OrderDetail { get; set; }
        public List<PostDTO> Post { get; set; }
        public List<RatingDTO> Rating { get; set; }
    }
}
