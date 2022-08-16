using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public class SignInService : BaseService<BaseRequest, BaseResponse>
    {
        private readonly IBaseRepository<BaseRequest, BaseResponse> _baseRepository;
        public SignInService()
        {
            _baseRepository = new SignInRepository();
        }
         
        protected override void preExcute(BaseRequest input)
        {
            // do nothing 
        }
        protected override BaseResponse doExcute(BaseRequest input)
        {
            return _baseRepository.excute(input);
        }

        protected override void postExcute(BaseRequest input)
        {
            //do nothing
        }

    }
}
