using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class SignInService : BaseService<IBaseRequest, IBaseResponse>
    {
        private readonly IBaseRepository<IBaseRequest, IBaseResponse> _baseRepository;
        public SignInService()
        {
            _baseRepository = new SignInRepository();
        }
         
        protected override void preExcute(IBaseRequest input)
        {
            // do nothing 
        }
        protected override IBaseResponse doExcute(IBaseRequest input)
        {
            CommonResponse baseResponse = (CommonResponse)_baseRepository.excute(input);
            if(baseResponse.Data is null)
            {
                baseResponse.Message = Message.NOT_FOUND;
                baseResponse.Code = Code.NOT_FOUND;
            }
            else
            {
                baseResponse.Message = Message.OK;
                baseResponse.Code = Code.OK;
            }
            return baseResponse;
        }

        protected override void postExcute(IBaseRequest input)
        {
            //do nothing
        }

    }
}
