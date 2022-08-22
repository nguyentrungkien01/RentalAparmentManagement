using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class OwnerRentalApartmentService : BaseService<IBaseRequest, IBaseResponse>
    {
        public OwnerRentalApartmentService() => _baseRepository = new OwnerRentalApartmentRepository();
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var validInput = (OwnerRentalApartmentRequestDTO)input;
            validInput.PhoneNumber = validInput.Identity.Claims.FirstOrDefault(
                e => e.Type == ClaimTypes.NameIdentifier)?.Value;

            var baseResponse = (CommonResponse)_baseRepository.Excute(validInput);
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
            // do nothing 
        }

        protected override void PreExcute(IBaseRequest input)
        {
           // do nothing 
        }
    }
}
