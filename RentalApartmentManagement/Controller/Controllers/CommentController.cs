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
    public class CommentController : BaseController
    {
        public CommentController()
        {
            _baseService = new CommentService();
        }

        [HttpPost]
        [Authorize(Roles = "user")]
        public IBaseResponse Comment([FromBody] CommentRequestDTO comment)
        {
            ClaimsIdentity Identity = HttpContext.User.Identity as ClaimsIdentity;
            comment.PhoneNumber = Identity.Claims.FirstOrDefault(
                e => e.Type == ClaimTypes.NameIdentifier)?.Value;

            return _baseService.Excute(comment);
        }
    }
}
