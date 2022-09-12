using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class OwnerRentalApartmentController : BaseController
    {
        public OwnerRentalApartmentController() => _baseService = new OwnerRentalApartmentService();

        [HttpGet]
        [Authorize(Roles = "user")]
        public IBaseResponse ViewOwnerRentalApartment()
        {
            return _baseService.Excute(new OwnerRentalApartmentRequestDTO
            {
                Identity = HttpContext.User.Identity as ClaimsIdentity
            });
        }
    }
}
