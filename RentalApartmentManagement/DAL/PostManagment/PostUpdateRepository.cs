using System;
using System.Collections.Generic;
using Util.Constant;
using DTO.Request;
using DTO.Respone;
using System.Text;
using System.Linq;

namespace DAL
{
    public class PostUpdateRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        private readonly int status = 0;
        public PostUpdateRepository(int status)
        {
            this.status = status;
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (PostUpdateRequestDTO)input;
            var baseResponse = new CommonResponse();
            var post = _dtContext.Post.FirstOrDefault(s => s.Id == req.Id);
            if (post == null)
            {
                baseResponse.Code = Code.NOT_FOUND;
                baseResponse.Message = Message.NOT_FOUND;
            }
            else
            {
                post.Status = status;
                _dtContext.SaveChanges();
                baseResponse.Code = Code.OK;
                baseResponse.Message = Message.OK;
            }
            return baseResponse;
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
