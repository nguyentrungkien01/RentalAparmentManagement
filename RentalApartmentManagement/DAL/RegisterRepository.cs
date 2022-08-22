using DTO.Request;
using DTO.Respone;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Util.Constant;
using DAL.Entity;

namespace DAL
{
    public class RegisterRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (RegisterRequest)input;
            try
            {
                Account acc = new Account();
                acc.FirstName = req.FirstName;
                acc.LastName = req.LastName;
                acc.Gender = req.Gender;
                acc.Address = req.Address;
                acc.PhoneNumber = req.PhoneNumber;
                acc.IdCard = req.IdCard;
                acc.Email = req.Email;
                acc.Password = req.Password;
                acc.RoleId = 2;
                _dtContext.Account.Add(acc);
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
                    Data = "Save failed",
                    Message = Message.SQL_EXCEPTION,
                    Code = Code.NOT_FOUND
                };
            }
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
