using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DAL.Entity;

namespace DAL
{
    public class PostGetListRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var baseResponse = new CommonResponse();
            List<Post> posts = _dtContext.Post.ToList();
            if(posts.Count > 0)
            {
                foreach(var p in posts)
                {
                   p.Image = _dtContext.Image.Where(s => s.PostId == p.Id).ToList();
                }
                baseResponse.Data = posts;
                baseResponse.Code = Util.Constant.Code.OK;
                baseResponse.Message = Util.Constant.Message.OK;
            }
            else
            {
                baseResponse.Code = Util.Constant.Code.NOT_FOUND;
                baseResponse.Message = Util.Constant.Message.NOT_FOUND;
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
