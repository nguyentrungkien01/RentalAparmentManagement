using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class UserReadService : BaseService<IBaseRequest, IBaseResponse>
    {
        public UserReadService(IConfiguration configuration)
        {
            _baseRepository = new UserReadRepository();
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var baseResponse = (CommonResponse)_baseRepository.Excute(input);
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
           //do nothing
        }

        protected override void PreExcute(IBaseRequest input)
        {
           //do nothing
        }
    }
}
