using DTO.Request;
using DTO.Respone;
using Microsoft.Data.SqlClient;
using System.Linq;
using Util.Constant;

namespace DAL
{
    public class UserUpdateRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (UserUpdateRequestDTO)input;
            var baseResponse = new CommonResponse();
            var account = _dtContext.Account.FirstOrDefault(s => s.Id == req.Id);
            if (!string.IsNullOrEmpty(req.PhoneNumber) && _dtContext.Account.FirstOrDefault(s => s.PhoneNumber == req.PhoneNumber) != null)
            {
                baseResponse.Code = Code.INVALID;
                baseResponse.Message = Message.DUPLICATE;
                return baseResponse;
            }
            if (account != null)
            {
                baseResponse.Code = Code.OK;
                baseResponse.Message = Message.OK;

                if (!string.IsNullOrEmpty(req.FirstName))
                    account.FirstName = req.FirstName;
                if (!string.IsNullOrEmpty(req.LastName))
                    account.LastName = req.LastName;
                               if (!string.IsNullOrEmpty(req.PhoneNumber))
                        account.PhoneNumber = req.PhoneNumber;
                if (!string.IsNullOrEmpty(req.Password))
                    account.Password = req.Password;
                if (req.RoleId > 0)
                    account.RoleId = req.RoleId;
                if (!string.IsNullOrEmpty(req.IdCard))
                    account.IdCard = req.IdCard;
                if (!string.IsNullOrEmpty(req.Gender))
                    account.Gender = req.Gender;
                if (req.Status != null)
                    account.Status = req.Status;
                if (!string.IsNullOrEmpty(req.Email))
                    account.Email = req.Email;
                if (!string.IsNullOrEmpty(req.Address))
                    account.Address = req.Address;
                _dtContext.SaveChanges();
            }
            else
            {
                baseResponse.Code = Code.NOT_FOUND;
                baseResponse.Message = Message.NOT_FOUND;
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
