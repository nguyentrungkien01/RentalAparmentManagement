using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class UpdateLikeController : BaseController
    {
        public UpdateLikeController()
        {
            _baseService = new UpdateLikeService();
        }

        [Authorize(Roles = "user")]
        [HttpPost]
        public IBaseResponse UpdateLike([FromQuery] LikeRequest res)
        {
            return _baseService.Excute(res);
        }
    }
}
