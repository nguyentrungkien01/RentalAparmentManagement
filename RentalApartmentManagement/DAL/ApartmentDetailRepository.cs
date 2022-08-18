using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ApartmentDetailRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (ApartmentDetailRequestDTO)input;
            CommonResponse baseResponse = new CommonResponse();
            Post post = new Post();
            post = _dtContext.Post.FirstOrDefault(s => s.Id == req.Id);
            if(post != null)
            {
                post.Image = (from image in _dtContext.Image
                              where image.PostId == req.Id
                              select image).ToList();
                List<Comment> comments = (
                                from comment in _dtContext.Comment
                                where comment.PostId == req.Id
                                select comment).ToList();
                comments.ForEach(s =>
                    s.Account = (from acc in _dtContext.Account
                                 where acc.Id == s.AccountId
                                 select acc).First()
                );
                post.Comment = comments;
                List<Rating> rating = (from r in _dtContext.Rating
                                       where r.PostId == req.Id
                                       select r).ToList();
                rating.ForEach(s =>
                    s.Account = (from acc in _dtContext.Account
                                 where acc.Id == s.AccountId
                                 select acc).First()
                );

                post.Rating = rating;
            }
            
            baseResponse.Data = post;
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
