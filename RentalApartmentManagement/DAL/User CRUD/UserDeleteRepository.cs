using DTO.Request;
using DTO.Respone;
using System.Linq;
using Util.Constant;

namespace DAL
{
    public class UserDeleteRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var userDeleteRequestDTO = (UserDeleteRequestDTO)input;
            var baseResponse = new CommonResponse();
            var account = _dtContext.Account.FirstOrDefault(s => s.Id == userDeleteRequestDTO.id);
            if(account == null)
            {
                baseResponse.Code = Code.NOT_FOUND;
                baseResponse.Message =Message.NOT_FOUND;
            }
            else
            {
                _dtContext.Account.Remove(account);
                _dtContext.SaveChanges();
                baseResponse.Code = Code.OK;
                baseResponse.Message =Message.OK;
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
