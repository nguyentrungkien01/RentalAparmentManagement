using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DAL.Entity;
namespace DAL
{
    public class OwnerRentalApartmentRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var ownerRentalApartmentRequestDTO = (OwnerRentalApartmentRequestDTO)input;
            CommonResponse baseResponse = new CommonResponse();
            var result = from account in _dtContext.Account
                         join post in _dtContext.Post
                         on account.Id equals post.AccountId
                         where account.PhoneNumber.Equals(ownerRentalApartmentRequestDTO.PhoneNumber) &&
                         account.Status.Equals(1)
                         select new
                         {
                            post.Id,
                            post.Image,
                            post.Latitude,
                            post.Longitude,
                            post.Status,
                            post.Title,
                            post.Content,
                            post.DateCreated
                         };
            baseResponse.Data = result;
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
            // do nothing
        }

        protected override void PreExcute(IBaseRequest input)
        {
            // do nothing
        }
    }
}
