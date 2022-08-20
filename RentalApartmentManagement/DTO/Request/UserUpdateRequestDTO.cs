using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class UserUpdateRequestDTO:IBaseRequest
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
        public int? Status { get; set; }
        public int RoleId { get; set; }
    }
}
