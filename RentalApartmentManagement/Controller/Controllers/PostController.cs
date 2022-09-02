using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Controller.Controllers
{
    public class PostController : BaseController
    {
        private readonly IConfiguration _configuration;
        public PostController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create")]
        //[Authorize(Roles = "user")]
        public IBaseResponse Create([FromForm] PostCreateRequestDTO postCreatRequestDTO, List<IFormFile> files)
        {
            postCreatRequestDTO.formFiles = files;
            _baseService = new PostCreateService(_configuration);
            return _baseService.Excute(postCreatRequestDTO);
        }

        [HttpGet("list")]
        //[Authorize(Roles = "admin")]
        public IBaseResponse GetList()
        {
            _baseService = new PostGetListService();
            return _baseService.Excute(new PostReadRequestDTO());
        }

        [HttpPut("approve/{id}")]
        //[Authorize(Roles = "admin")]
        public IBaseResponse Approve([FromRoute] int id)
        {
            PostUpdateRequestDTO postUpdateRequestDTO = new PostUpdateRequestDTO();
            postUpdateRequestDTO.Id = id;
            _baseService = new PostUpdateService(1);
            return _baseService.Excute(postUpdateRequestDTO);
        }

        [HttpPut("reject/{id}")]
        //[Authorize(Roles = "admin")]
        public IBaseResponse Reject([FromRoute] int id)
        {
            PostUpdateRequestDTO postUpdateRequestDTO = new PostUpdateRequestDTO();
            postUpdateRequestDTO.Id = id;
            _baseService = new PostUpdateService(2);
            return _baseService.Excute(postUpdateRequestDTO);
        }

        [HttpPut("delete/{id}")]
        //[Authorize(Roles = "admin")]
        public IBaseResponse Delete([FromRoute] int id)
        {
            PostUpdateRequestDTO postUpdateRequestDTO = new PostUpdateRequestDTO();
            postUpdateRequestDTO.Id = id;
            _baseService = new PostUpdateService(-1);
            return _baseService.Excute(postUpdateRequestDTO);
        }
    }
}
