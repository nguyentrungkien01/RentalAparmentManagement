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
    public class RatingController : BaseController
    {
        public RatingController()
        {
            _baseService = new RatingService();
        }

        [AllowAnonymous]
        [HttpPost]
        public IBaseResponse Rating([FromBody] RatingRequest res)
        {
            ClaimsIdentity Identity = HttpContext.User.Identity as ClaimsIdentity;
            res.PhoneNumber = Identity.Claims.FirstOrDefault(
                e => e.Type == ClaimTypes.NameIdentifier)?.Value;
            return _baseService.Excute(res);
        }
    }
}
