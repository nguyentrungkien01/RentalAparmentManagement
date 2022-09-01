using DAL;
using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util;
using Util.Constant;
namespace BUS
{
    public class ViewApartmentService : BaseService<IBaseRequest, IBaseResponse>
    {
        public ViewApartmentService()
        {
            _baseRepository = new ViewApartmentRepository();
        }

        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (ViewApartmentRequestDTO)input;
            if (req.ToPrice!=0 && req.FromPrice > req.ToPrice)
            {
                return new CommonResponse
                {
                    Code = Code.INVALID,
                    Message = Message.INVALID
                };
            }
            var baseResponse = (CommonResponse)_baseRepository.Excute(input);
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
