using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Util.Constant;

namespace DAL
{
    public class UpdateAccountRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            try
            {
                UpdateAccountRequestDTO req = (UpdateAccountRequestDTO)input;
                var ud = _dtContext.Account.Single(s => s.PhoneNumber == req.OldPhoneNumber);
                int id = ud.Id;
                string i = ud.FirstName;
                // xu ly du lieu
                if (!CheckPhoneNumber(req.PhoneNumber, ud.Id))
                {
                    return new CommonResponse
                    {
                        Data = "Phone number already exists",
                        Code = Code.INVALID,
                        Message = Message.INVALID
                    };
                }

                if (!CheckIdCard(req.IdCard, ud.Id))
                {
                    return new CommonResponse
                    {
                        Data = "IdCard already exists",
                        Code = Code.INVALID,
                        Message = Message.INVALID
                    };
                }
                if (!CheckEmail(req.Email, ud.Id))
                {
                    return new CommonResponse
                    {
                        Data = "Email already exists",
                        Code = Code.INVALID,
                        Message = Message.INVALID
                    };
                }
                //
                ud.FirstName = req.FirstName;
                ud.LastName = req.LastName;
                ud.Gender = req.Gender;
                ud.Address = req.Address;
                ud.PhoneNumber = req.PhoneNumber;
                ud.IdCard = req.IdCard;
                ud.Email = req.Email;
                ud.Password = req.Password;
                _dtContext.SaveChanges();
                return new CommonResponse
                {
                    Message = Message.OK,
                    Code = Code.OK
                };
            }
            catch
            {
                return new CommonResponse
                {
                    Message = Message.NOT_FOUND,
                    Code = Code.NOT_FOUND
                };
            }
        }

        private bool CheckPhoneNumber(string newPhoneNumber, int id)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.PhoneNumber == newPhoneNumber && s.Id != id) != null)
                return false;
            return true;
        }

        private bool CheckIdCard(string newIdCard, int id)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.IdCard == newIdCard && s.Id != id) != null)
                return false;
            return true;
        }
        private bool CheckEmail(string newEmail, int id)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.Email == newEmail && s.Id != id) != null)
                return false;
            return true;
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
