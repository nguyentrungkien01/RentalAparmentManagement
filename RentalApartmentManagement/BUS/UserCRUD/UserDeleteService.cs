using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;

namespace BUS
{
    public class UserDeleteService : BaseService<IBaseRequest, IBaseResponse>
    {
        public UserDeleteService(IConfiguration configuration)
        {
            _baseRepository = new UserDeleteRepository();
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var baseResponse = (CommonResponse)_baseRepository.Excute(input);
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
