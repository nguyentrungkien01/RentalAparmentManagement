using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using Util;
using Util.Constant;

namespace BUS
{
    public class RegisterService : BaseService<IBaseRequest, IBaseResponse>
    {
        private readonly MailUtil _mailUtil;
        private static int Code;
        public RegisterService(IConfiguration configuration)
        {
            _baseRepository = new RegisterRepository();
            _mailUtil = new MailUtil();
            _mailUtil.Username = configuration["Email:Username"];
            _mailUtil.Password = configuration["Email:Password"];
            _mailUtil.Port = int.Parse(configuration["Email:Port"]);
            _mailUtil.Host = configuration["Email:Host"];
            _mailUtil.EnableSsl =bool.Parse(configuration["Email:EnableSsl"]);
            _mailUtil.UseDefaultCredentials =bool.Parse( configuration["Email:UseDefaultCredentials"]);
            _mailUtil.IsBodyHtml = bool.Parse(configuration["Email:IsBodyHtml"]);
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (RegisterRequest)input;
            if (req.FirstName is null || req.FirstName == "" || 
                req.LastName is null || req.LastName == "" || 
                req.Gender is null || req.Gender == ""|| 
                req.PhoneNumber is null || req.PhoneNumber == "" ||
                req.IdCard is null || req.IdCard ==""|| 
                req.Email is null || req.Email == "" ||
                req.Password is null || req.Password == "")
            {
                return new CommonResponse
                {
                    Data = "Incomplete information",
                    Message = Message.INVALID,
                    Code = Util.Constant.Code.INVALID
                };
            }

            CheckUniqueAccountRepository _check = new CheckUniqueAccountRepository();
            if (_check.CheckPhoneNumber(req.PhoneNumber))
            {
                return new CommonResponse
                {
                    Data = "Phone number already exists",
                    Message = Message.INVALID,
                    Code = Util.Constant.Code.INVALID
                };
            }
            if (_check.CheckIdCard(req.IdCard))
            {
                return new CommonResponse
                {
                    Data = "IdCard already exists",
                    Message = Message.INVALID,
                    Code = Util.Constant.Code.INVALID
                };
            }
            if (_check.CheckEmail(req.Email))
            {
                return new CommonResponse
                {
                    Data = "Email already exists",
                    Message = Message.INVALID,
                    Code = Util.Constant.Code.INVALID
                };
            }

            if (req.Code == -1)
            {
                Random generator = new Random();
                Code = generator.Next(100000, 1000000);
                string cont = Code + " là mã xác nhận đăng ký tài khoản của bạn. ";
                if (!_mailUtil.Send(req.Email, "YOLO Apartment", cont))
                {
                    return new CommonResponse
                    {
                        Data = "Mailing failed",
                        Message = Message.NOT_FOUND,
                        Code = Util.Constant.Code.NOT_FOUND
                    };
                }
                return new CommonResponse
                {
                    Data = "Mailing successfully",
                    Message = Message.OK,
                    Code = Util.Constant.Code.OK
                };
            }
            if (req.Code != Code)
            {
                return new CommonResponse
                {
                    Data = "Wrong verification code",
                    Message = Message.NOT_FOUND,
                    Code = Util.Constant.Code.INVALID
                };
            }
            else
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
