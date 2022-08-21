using DTO.Request;
using DTO.Respone;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using DAL.Entity;
using Util.Constant;

namespace DAL
{
    public class UpdateLikeRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            try
            {
                var res = (LikeRequest)input;
                Post ud =_dtContext.Post.Single(s=> s.Id == res.PostId);
                int? oldLikeAmount = GetOldLikeAmount(res.PostId);
                ud.LikeAmount = (res.Flag == 1) ? ++oldLikeAmount : --oldLikeAmount;
                _dtContext.SaveChanges();
                return new CommonResponse
                {
                    Data = GetOldLikeAmount(res.PostId),
                    Message = Message.OK,
                    Code = Code.OK
                };
            }
            catch
            {
                return new CommonResponse
                {
                    Message = Message.NOT_FOUND,
                    Code = Code.NOT_FOUND
                };
            }
        }

        private int? GetOldLikeAmount(int postId)
        {
            return (from post in _dtContext.Post
                    where post.Id == postId
                    select post.LikeAmount).FirstOrDefault();
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
