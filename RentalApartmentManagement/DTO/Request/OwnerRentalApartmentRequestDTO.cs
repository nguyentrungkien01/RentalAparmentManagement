using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace DTO.Request
{
    public class OwnerRentalApartmentRequestDTO : IBaseRequest
    {
        public ClaimsIdentity Identity { get; set; }
        public string PhoneNumber { get; set; }
    }
}
