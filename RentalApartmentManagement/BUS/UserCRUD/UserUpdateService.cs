using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using Util.Constant;

namespace BUS
{
    public class UserUpdateService : BaseService<IBaseRequest, IBaseResponse>
    {
        public UserUpdateService()
        {
            _baseRepository = new UserUpdateRepository();
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
