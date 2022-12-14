using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class UpdateAccountRequestDTO : IBaseRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IdCard { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string OldPhoneNumber { get; set; }
    }
}
