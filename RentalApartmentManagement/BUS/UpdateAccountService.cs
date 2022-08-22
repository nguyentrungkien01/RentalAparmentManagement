using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class UpdateAccountService : BaseService<IBaseRequest, IBaseResponse>
    {
        private CheckUniqueAccountRepository _check;
        public UpdateAccountService()
        {
            _baseRepository = new UpdateAccountRepository();
            _check = new CheckUniqueAccountRepository();
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (UpdateAccountRequestDTO)input;
            if (req.FirstName is null || req.FirstName == "" ||
                req.LastName is null || req.LastName == "" ||
                req.Gender is null || req.Gender == "" ||
                req.PhoneNumber is null || req.PhoneNumber == "" ||
                req.IdCard is null || req.IdCard == "" ||
                req.Email is null || req.Email == "" ||
                req.Password is null || req.Password == "" ||
                req.OldPhoneNumber is null || req.OldPhoneNumber == "")
            {
                return new CommonResponse
                {
                    Data = "Incomplete information",
                    Message = Message.INVALID,
                    Code = Util.Constant.Code.INVALID
                };
            }

            return _baseRepository.Excute(input);
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
