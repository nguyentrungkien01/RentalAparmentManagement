using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DAL.Entity;
using Util.Constant;

namespace DAL
{
    public class UserDetailRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var userDetailRequestDTO = (UserDetailRequestDTO)input;
            var baseResponse = new CommonResponse();
            var result = from account in _dtContext.Account
                         join role in _dtContext.Role
                         on account.RoleId equals role.Id
                         where account.PhoneNumber.Equals(userDetailRequestDTO.PhoneNumber) &&
                         account.Status.Equals(1)
                         select new
                         {
                             account.FirstName,
                             account.LastName,
                             account.Gender,
                             account.Address,
                             account.IdCard,
                             account.PhoneNumber,
                             account.DateCreated,
                             account.Email,
                             Role = role.Name
                         };
            baseResponse.Data = result;
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

        public Account FindUserByPhoneNumber(string phoneNumber)
        {
           return _dtContext.Account.FirstOrDefault(a => a.PhoneNumber.Equals(phoneNumber));
        }
    }
}
