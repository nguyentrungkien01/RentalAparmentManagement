using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Util;

namespace Controller.Controllers
{

    public class SignInController : BaseController
    {
        public SignInController(IConfiguration configuration) => _baseService = new SignInService(configuration);

        [HttpPost]
        [AllowAnonymous]
        public IBaseResponse SignIn([FromBody] SignInRequestDTO signInRequestDTO)
        {
            return _baseService.Excute(signInRequestDTO);
        }

        [HttpGet]
        [AllowAnonymous]
        public IBaseResponse Test()
        {
            MailUtil.Send("1951052091kien@ou.edu.vn", "Test");
            return null;
        }
    }
}
