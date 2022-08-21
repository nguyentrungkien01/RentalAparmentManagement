using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public class PostCreateService : BaseService<IBaseRequest, IBaseResponse>
    {
        private readonly IConfiguration _configuration;
        public PostCreateService(IConfiguration configuration)
        {
            _configuration = configuration;
            _baseRepository = new PostCreateRepository(_configuration);
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var baseResponse = (CommonResponse)_baseRepository.Excute(input);
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
            //
        }

        protected override void PreExcute(IBaseRequest input)
        {
           //
        }
    }
}
