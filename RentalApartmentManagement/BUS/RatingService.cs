using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class RatingService : BaseService<IBaseRequest, IBaseResponse>
    {
        public RatingService()
        {
            _baseRepository = new RatingRepository();
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var res = (RatingRequest)input;
            if(input is null || res.PhoneNumber is null)
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
