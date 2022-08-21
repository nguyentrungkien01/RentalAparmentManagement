using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class UserCreateService : BaseService<IBaseRequest, IBaseResponse>
    {
        public UserCreateService(IConfiguration configuration)
        {
            _baseRepository = new UserCreateRepository();
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var validInput = (UserCreateRequestDTO)input;
            if (String.IsNullOrEmpty(validInput.FirstName) || String.IsNullOrEmpty(validInput.LastName) || String.IsNullOrEmpty(validInput.Gender)
                || String.IsNullOrEmpty(validInput.PhoneNumber) || String.IsNullOrEmpty(validInput.IdCard) || String.IsNullOrEmpty(validInput.Email) ||
                String.IsNullOrEmpty(validInput.Password)) 
            {
                return new CommonResponse
                {
                    Code = Code.INVALID,
                    Message = Message.INVALID
                };
            }
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
