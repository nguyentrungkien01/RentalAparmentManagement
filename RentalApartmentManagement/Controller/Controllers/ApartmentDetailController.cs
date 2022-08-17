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
    public class ApartmentDetailController : ControllerBase
    {
        private readonly IBaseService<int, IBaseResponse> _detailService;           
        public ApartmentDetailController()
        {
            _detailService = new ApartmentDetailService();
        }

        [AllowAnonymous]
        [HttpGet]
        public IBaseResponse SignIn([FromQuery] int id)
        {
            return _detailService.excute(id);
        }
    }
}
