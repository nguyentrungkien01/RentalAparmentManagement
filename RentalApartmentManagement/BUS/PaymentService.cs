using DAL;
using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util;
using Util.Constant;

namespace BUS
{
    public class PaymentService : BaseService<IBaseRequest, IBaseResponse>
    {
        private readonly SMSUtil _SMSUtil;
        public ClaimsIdentity ClaimsIdentity { get; set; }
        private readonly UserDetailRepository _userRepository;
        public PaymentService(IConfiguration configuration){
            _baseRepository = new PaymentRepository();
            _userRepository = new UserDetailRepository();
            _SMSUtil = new SMSUtil();
            _SMSUtil.AccountSID = configuration["Twillio:AccountSID"];
            _SMSUtil.AuthToken = configuration["Twillio:AuthToken"];
    }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var paymentRequestDTO = (PaymentRequestDTO)input;
            var PhoneNumber = ClaimsIdentity.Claims.FirstOrDefault(
                        e => e.Type == ClaimTypes.NameIdentifier)?.Value;
            if (paymentRequestDTO is null ||
                paymentRequestDTO.OrderDetails is null ||
                paymentRequestDTO.OrderDetails.Count <= 0)
                return new CommonResponse
                {
                    Message = Message.INVALID_REQUEST,
                    Code = Code.INVALID_REQUEST
                };

            Account account = _userRepository.FindUserByPhoneNumber(PhoneNumber);
            paymentRequestDTO.AccountId = account.Id;
            var baseResponse = (CommonResponse)_baseRepository.Excute(paymentRequestDTO);
            if (baseResponse.Data is null)
            {
                baseResponse.Message = Message.CONFLICT;
                baseResponse.Code = Code.CONFLICT;
            }
            else {
                var message = String.Format("You rent {0} the bill with at {1}",
                    baseResponse.Data, DateTime.Now);
                _SMSUtil.SendSMS("+13344534854", "+84982482975", message);
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
