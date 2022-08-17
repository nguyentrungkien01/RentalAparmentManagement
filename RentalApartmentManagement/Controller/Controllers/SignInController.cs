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
using System.Threading.Tasks;

namespace Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsApi")]
    public class SignInController : ControllerBase
    {
        private readonly IConfiguration _cofiguration;
        private readonly IBaseService<IBaseRequest, IBaseResponse> _signInService;
        public SignInController()
        {
            _signInService = new SignInService();
        }

        [AllowAnonymous]
        [HttpPost]
        public IBaseResponse SignIn([FromBody] SignInRequestDTO signInRequestDTO)
        {
            return _signInService.excute(signInRequestDTO);
        }
    }
}
