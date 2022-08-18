using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class CommentService : BaseService<IBaseRequest, IBaseResponse>
    {
        public CommentService()
        {
            _baseRepository = new CommentRepository();
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var res = (CommentRequestDTO)input;
            if (res is null || res.PhoneNumber is null)
            {
                return new CommonResponse
                {
                    Message = Message.NOT_FOUND,
                    Code = Code.NOT_FOUND
                };
            }

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
