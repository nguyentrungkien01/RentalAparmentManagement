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
    public class ApartmentDetailController : BaseController
    {       
        public ApartmentDetailController()
        {
            _baseService = new ApartmentDetailService();
        }

        [AllowAnonymous]
        [HttpGet]
        public IBaseResponse Detail([FromQuery] ApartmentDetailRequestDTO apm)
        {
            return _baseService.Excute(apm);
        }
    }
}
