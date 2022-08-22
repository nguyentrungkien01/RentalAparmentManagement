using DTO.Request;
using DTO.Respone;
using System.Linq;

namespace DAL
{
    public class UserReadRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var baseResponse = new CommonResponse();
            baseResponse.Data = from account in _dtContext.Account
                                            join role in _dtContext.Role
                                            on account.RoleId equals role.Id
                                            select new
                                            {
                                                account.Id,
                                                account.FirstName,
                                                account.LastName,
                                                account.Gender,
                                                account.Address,
                                                account.IdCard,
                                                account.PhoneNumber,
                                                account.DateCreated,
                                                account.Email,
                                                account.Password,
                                                Role = role.Name
                                            };
            baseResponse.Code = Util.Constant.Code.OK;
            baseResponse.Message = Util.Constant.Message.OK;
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
