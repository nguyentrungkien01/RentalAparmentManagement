using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
namespace DAL
{
    public class SignInRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        private readonly RentalApartmentManagementContext _dtContext;

        public SignInRepository()
        {
            _dtContext = new RentalApartmentManagementContext();
        }


        protected override IBaseResponse doExcute(IBaseRequest input)
        {
            SignInRequestDTO signInRequestDTO = (SignInRequestDTO)input;
            CommonResponse baseResponse = new CommonResponse();
            baseResponse.Data = _dtContext.Account.FirstOrDefault(
                account =>
                account.PhoneNumber.Equals(signInRequestDTO.PhoneNumber) &&
                account.Password.Equals(signInRequestDTO.Password)
                );
            return baseResponse;
        }

        protected override void postExcute(IBaseRequest input)
        {
            // close connection to database
        }

        protected override void preExcute(IBaseRequest input)
        {
            //  open connection to database
        }
    }
}
