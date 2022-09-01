using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class ViewApartmentRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (ViewApartmentRequestDTO)input;
            var baseResponse = new CommonResponse();

            List<Post> posts = _dtContext.Post.Where(s => s.Status == 1 && s.Address.Contains(req.Address)).ToList();

            if (req.FromPrice != 0)
            {
                List<Post> result = new List<Post>();
                foreach(var p in posts)
                {
                    if (p.PricePerMonth >= req.FromPrice)
                        result.Add(p);
                }
                posts = result;
            }
            if (req.ToPrice != 0)
            {
                List<Post> result = new List<Post>();
                foreach (var p in posts)
                {
                    if (p.PricePerMonth <= req.ToPrice)
                        result.Add(p);
                }
                posts = result;
            }
            if(posts.Count > 0)
            {
                foreach (var p in posts)
                {
                    p.Image = _dtContext.Image.Where(s => s.PostId == p.Id).ToList();
                    p.Account = _dtContext.Account.Where(s => s.Id == p.AccountId).FirstOrDefault();
                    p.Account.Post = null;
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
