using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class StatisticController : BaseController
    {
        public StatisticController()
        {
            _baseService = new StatisticService();
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public IBaseResponse Detail([FromQuery] StatisticRequestDTO req)
        {
            return _baseService.Excute(req);
        }
    }
}
