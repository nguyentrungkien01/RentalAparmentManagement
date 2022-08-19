using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Linq;
using Util.Constant;

namespace DAL
{
    public class UserCreateRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var userCreateRequestDTO = (UserCreateRequestDTO)input;
            var baseResponse = new CommonResponse();
            if (!string.IsNullOrEmpty(userCreateRequestDTO.PhoneNumber) 
                && _dtContext.Account.FirstOrDefault(s => s.PhoneNumber == userCreateRequestDTO.PhoneNumber) != null)
            {
                baseResponse.Code = Code.INVALID;
                baseResponse.Message = Message.DUPLICATE;
            }
            else
            {
                Account account = new Account();
                account.FirstName = userCreateRequestDTO.FirstName;
                account.LastName = userCreateRequestDTO.LastName;
                account.Password = userCreateRequestDTO.Password;
                account.PhoneNumber = userCreateRequestDTO.PhoneNumber;
                account.RoleId = userCreateRequestDTO.RoleId;
                account.IdCard = userCreateRequestDTO.IdCard;
                account.Gender = userCreateRequestDTO.Gender;
                account.Status = userCreateRequestDTO.Status;
                account.Email = userCreateRequestDTO.Email;
                account.Address = userCreateRequestDTO.Address;
                account.DateCreated = DateTime.Now;
                _dtContext.Add(account);
                _dtContext.SaveChanges();
                baseResponse.Code = Code.OK;
                baseResponse.Message = Message.OK;
            }
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
