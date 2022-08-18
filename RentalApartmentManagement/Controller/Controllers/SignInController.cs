using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Controller.Controllers
{

    public class SignInController : BaseController
    {
        public SignInController(IConfiguration configuration)
        {
            _baseService = new SignInService(configuration);
        }

        [HttpPost]
        [AllowAnonymous]
        public IBaseResponse SignIn([FromBody] SignInRequestDTO signInRequestDTO)
        {
            return _baseService.excute(signInRequestDTO);
        }
    }
}
