using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Util;

namespace Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostCreateController : BaseController
    {
        public PostCreateController()
        {
            _baseService = new PostCreateService();
        }

        [HttpPost]
        //[Authorize(Roles="user")]
        public IBaseResponse Create([FromForm] PostCreateRequestDTO postCreatRequestDTO, List<IFormFile> files)
        {
            postCreatRequestDTO.formFiles = files;
            return _baseService.Excute(postCreatRequestDTO); ;
        }
    }
}
