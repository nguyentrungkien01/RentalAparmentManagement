using DAL;
using DTO.Request;
using DTO.Respone;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class SignInService : BaseService<IBaseRequest, IBaseResponse>
    {
        private readonly IBaseRepository<IBaseRequest, IBaseResponse> _baseRepository;
        private readonly IConfiguration _configuration;
        public SignInService(IConfiguration configuration)
        {
            _baseRepository = new SignInRepository();
            this._configuration = configuration;
        }

        protected override void preExcute(IBaseRequest input)
        {
            // do nothing 
        }
        protected override IBaseResponse doExcute(IBaseRequest input)
        {
            var baseResponse = (CommonResponse)_baseRepository.excute(input);
            var signInResponseDTO = new SignInResponseDTO(baseResponse);
            if (signInResponseDTO.Data is null)
            {
                signInResponseDTO.Message = Message.NOT_FOUND;
                signInResponseDTO.Code = Code.NOT_FOUND;
            }
            else
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                IDictionary<string, string> dict = (IDictionary<string, string>)signInResponseDTO.Data;
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, dict["PhoneNumber"]),
                        new Claim(ClaimTypes.GivenName, dict["LastName"]),
                        new Claim(ClaimTypes.Surname, dict["LastName"]),
                        new Claim(ClaimTypes.Role, dict["Role"])
                    },
                    expires: DateTime.Now.AddDays(15),
                    signingCredentials: credentials
                 );
                signInResponseDTO.Token = new JwtSecurityTokenHandler().WriteToken(token);
                signInResponseDTO.Message = Message.OK;
                signInResponseDTO.Code = Code.OK;
            }
            return signInResponseDTO;
        }

        protected override void postExcute(IBaseRequest input)
        {
            //do nothing
        }

    }

}
