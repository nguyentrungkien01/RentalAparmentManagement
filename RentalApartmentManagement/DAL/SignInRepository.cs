using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class SignInRepository : IBaseRepository<BaseRequest, BaseResponse>
    {
        public BaseResponse excute(BaseRequest input)
        {
            return new BaseResponse();
        }
    }
}
