using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System.Collections.Generic;
using System.Linq;
namespace DAL
{
    public class SignInRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
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
                baseResponse.Data = new Dictionary<string, string>
                {
                    { "FirstName", result[0].FirstName },
                    { "LastName", result[0].LastName },
                    { "PhoneNumber", result[0].PhoneNumber},
                    { "Role", result[0].Role}

                };
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
