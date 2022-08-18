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
using System.Threading.Tasks;

namespace Controller.Controllers
{
    public class UserDetailController : BaseController
    {

        public UserDetailController()
        {
            _baseService = new UserDetailService();
        }
        [HttpPost]
        [Authorize]
        public IBaseResponse GetCurrentUserDetail([FromBody] UserDetailRequestDTO userDetailRequestDTO)
        {
            return _baseService.excute(userDetailRequestDTO);
        }
    }
}
