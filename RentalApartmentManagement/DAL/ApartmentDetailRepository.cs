using DAL.Entity;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ApartmentDetailRepository : BaseRepository<int, IBaseResponse>
    {
        private readonly RentalApartmentManagementContext _dtContext;

        public ApartmentDetailRepository()
        {
            _dtContext = new RentalApartmentManagementContext();
        }

        protected override IBaseResponse DoExcute(int input)
        {
            CommonResponse baseResponse = new CommonResponse();
            Post post = new Post();
            post = _dtContext.Post.FirstOrDefault(s => s.Id == input);
            if(post != null)
            {
                post.Image = (from image in _dtContext.Image
                              where image.PostId == input
                              select image).ToList();
                List<Comment> comments = (
                                from comment in _dtContext.Comment
                                where comment.PostId == input
                                select comment).ToList();
                comments.ForEach(s =>
                    s.Account = (from acc in _dtContext.Account
                                 where acc.Id == s.AccountId
                                 select acc).First()
                );
                post.Comment = comments;
                List<Rating> rating = (from r in _dtContext.Rating
                                       where r.PostId == input
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


        protected override void PostExcute(int input)
        {
            //
        }

        protected override void PreExcute(int input)
        {
            //
        }
    }
}
