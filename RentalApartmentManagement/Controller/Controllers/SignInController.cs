using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsApi")]
    public class SignInController : ControllerBase
    {
        private readonly IBaseService<IBaseRequest, IBaseResponse> _signInService;
        public SignInController(IConfiguration configuration)
        {
            _signInService = new SignInService(configuration);
        }

        [HttpPost]
        [AllowAnonymous]
        public IBaseResponse SignIn([FromBody] SignInRequestDTO signInRequestDTO)
        {
            return _signInService.excute(signInRequestDTO);
        }
    }
}
