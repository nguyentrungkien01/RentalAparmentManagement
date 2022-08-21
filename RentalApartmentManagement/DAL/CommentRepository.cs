using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Util.Constant;

namespace DAL
{
    public class CommentRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            try
            {
                var res = (CommentRequestDTO)input;
                Comment newComment = new Comment();
                newComment.AccountId = GetAccountID(res.PhoneNumber);
                newComment.Content = res.Content;
                newComment.PostId = res.PostId;
                _dtContext.Comment.Add(newComment);
                _dtContext.SaveChanges();
                return new CommonResponse
                {
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

        private int GetAccountID(string phoneNumber)
        {
            return (from acc in _dtContext.Account
                    where acc.PhoneNumber == phoneNumber
                    select acc.Id).FirstOrDefault();
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
