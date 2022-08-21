using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class RegisterController  :BaseController
    {
        public RegisterController(IConfiguration configuration)
        {
            _baseService = new RegisterService(configuration);
        }

        [AllowAnonymous]
        [HttpGet]
        public IBaseResponse Register([FromBody] RegisterRequest req)
        {
            return _baseService.Excute(req);
        }
    }
}
