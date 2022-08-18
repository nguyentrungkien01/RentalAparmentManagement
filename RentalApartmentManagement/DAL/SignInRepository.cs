using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System.Collections.Generic;
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
            var signInRequestDTO = (SignInRequestDTO)input;
            var baseResponse = new CommonResponse();

            var result = (from account in _dtContext.Account
                                join role in _dtContext.Role
                                on account.RoleId equals role.Id
                                where account.PhoneNumber.Equals(signInRequestDTO.PhoneNumber) &&
                                account.Password.Equals(signInRequestDTO.Password)
                                select new
                                {
                                    account.FirstName,
                                    account.LastName,
                                    account.PhoneNumber,
                                    Role = role.Name
                                }).ToList();

            if (result.Count >= 1)
            {
                IDictionary<string, string> dict = new Dictionary<string, string>();
                dict.Add("FirstName", result[0].FirstName);
                dict.Add("LastName", result[0].LastName);
                dict.Add("PhoneNumber", result[0].PhoneNumber);
                dict.Add("Role", result[0].Role);
                baseResponse.Data = dict;
            }
             
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
