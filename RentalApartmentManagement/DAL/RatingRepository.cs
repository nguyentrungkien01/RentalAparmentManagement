using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DAL.Entity;
using Util.Constant;

namespace DAL
{
    public class RatingRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            try
            {
                var res = (RatingRequest)input;
                Rating newR = new Rating();
                newR.AccountId = GetAccountID(res.PhoneNumber);
                newR.PostId = res.PostId;
                newR.RateAmount = res.RateAmount;

                if(IsRated(newR))
                    return new CommonResponse
                    {
                        Data = "This user rated",
                        Message = Message.NOT_FOUND,
                        Code = Code.NOT_FOUND
                    };

                _dtContext.Rating.Add(newR);
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

        public Boolean IsRated(Rating r)
        {
            Rating rating = new Rating();
            rating = _dtContext.Rating.FirstOrDefault(s => s.AccountId == r.AccountId && s.PostId == r.PostId);
            if (rating is null)
                return false;
            return true;
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
