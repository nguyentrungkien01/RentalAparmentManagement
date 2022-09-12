using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class UpdateAccountController : BaseController
    {
        public UpdateAccountController()
        {
            _baseService = new UpdateAccountService();
        }

        [HttpPost]
        [Authorize(Roles = "user")]
        public IBaseResponse UpdateAccount([FromBody] UpdateAccountRequestDTO req)
        {
            ClaimsIdentity Identity = HttpContext.User.Identity as ClaimsIdentity;
            req.OldPhoneNumber = Identity.Claims.FirstOrDefault(
                e => e.Type == ClaimTypes.NameIdentifier)?.Value;
            return _baseService.Excute(req);
        }
    }
}
