using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util.Constant;
using DAL;
namespace BUS
{
    public class UserDetailService : BaseService<IBaseRequest, IBaseResponse>
    {
        public UserDetailService() => _baseRepository = new UserDetailRepository();
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {

            var validInput = (UserDetailRequestDTO)input;
            if (validInput is null || validInput.Identity is null)
            {
                return new CommonResponse
                {
                    Message = Message.NOT_FOUND,
                    Code = Code.NOT_FOUND
                };
            }

            validInput.PhoneNumber = validInput.Identity.Claims.FirstOrDefault(
                e => e.Type == ClaimTypes.NameIdentifier)?.Value;

            if (String.IsNullOrEmpty(validInput.PhoneNumber))
            {
                return new CommonResponse
                {
                    Message = Message.NOT_FOUND,
                    Code = Code.NOT_FOUND
                };
            }

            var baseResponse = (CommonResponse)_baseRepository.Excute(input);
            if (baseResponse.Data is null)
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

        protected override void PostExcute(IBaseRequest input)
        {
            // do nothing
        }

        protected override void PreExcute(IBaseRequest input)
        {
            // do nothing
        }
    }
}
