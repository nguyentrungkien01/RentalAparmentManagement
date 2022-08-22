﻿using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Controller.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize(Roles ="admin")]
        public IBaseResponse Create([FromBody] UserCreateRequestDTO userCreateRequestDTO)
        {
            _baseService = new UserCreateService(_configuration);
            return _baseService.Excute(userCreateRequestDTO); ;
        }

        [HttpGet]
        [Authorize(Roles ="admin")]
        public IBaseResponse Read()
        {
            _baseService = new UserReadService(_configuration);
            UserReadRequestDTO userReadRequestDTO = new UserReadRequestDTO();
            return _baseService.Excute(userReadRequestDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles ="admin")]
        public IBaseResponse Update([FromBody] UserUpdateRequestDTO userUpdateRequestDTO, [FromRoute] int id)
        {
            _baseService = new UserUpdateService(_configuration);
            userUpdateRequestDTO.Id = id;
            return _baseService.Excute(userUpdateRequestDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles ="admin")]
        public IBaseResponse Delete([FromRoute] UserDeleteRequestDTO userDeleteRequestDTO)
        {
            _baseService = new UserDeleteService(_configuration);
            return _baseService.Excute(userDeleteRequestDTO);
        }
    }
}
