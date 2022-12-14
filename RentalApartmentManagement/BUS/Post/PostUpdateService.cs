using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public class PostUpdateService : BaseService<IBaseRequest, IBaseResponse>
    {
        public PostUpdateService(int status)
        {
            _baseRepository = new PostUpdateRepository(status);
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
