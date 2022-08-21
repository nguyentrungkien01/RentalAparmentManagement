using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class ApartmentDetailService : BaseService<IBaseRequest, IBaseResponse>
    {
        public ApartmentDetailService()
        {
            _baseRepository = new ApartmentDetailRepository();
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            CommonResponse baseResponse = (CommonResponse)_baseRepository.Excute(input);
            if (baseResponse.Data is null)
            {
                baseResponse.Message = Message.NOT_FOUND;
                baseResponse.Code = Code.NOT_FOUND;
            }
            else
            {
                baseResponse.Message = Message.OK;
                baseResponse.Code = Code.OK;
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
