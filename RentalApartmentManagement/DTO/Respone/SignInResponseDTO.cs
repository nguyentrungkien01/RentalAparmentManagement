using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
    public class SignInResponseDTO: CommonResponse
    {
        public string Token { get; set; }

        public SignInResponseDTO(CommonResponse commonResponse)
        {
            Data = commonResponse.Data;
            Message = commonResponse.Message;
            Code = commonResponse.Code;
        }
    }
}
