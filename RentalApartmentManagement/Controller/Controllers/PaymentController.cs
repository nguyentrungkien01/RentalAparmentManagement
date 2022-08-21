using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Util;

namespace Controller.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly MomoUtil _momoUtil;
        public PaymentController(IConfiguration configuration)
        {

            _baseService = new PaymentService(configuration);
            _momoUtil = new MomoUtil();
            _momoUtil.AccessKey = configuration["Momo:AccessKey"];
            _momoUtil.ApiUrl = configuration["Momo:ApiUrl"];
            _momoUtil.PartnerCode = configuration["Momo:PartnerCode"];
            _momoUtil.SecretKey = configuration["Momo:SecretKey"];

        }

        [HttpPost("momo")]
        [Authorize(Roles ="user")]
        public IBaseResponse GetMoMoPaymentURL([FromBody] MomoRequestDTO momoRequestDTO)
        {
            return _momoUtil.CreateMomoPayment(momoRequestDTO);
        }

        [HttpPost("pay")]
        [Authorize(Roles ="user")]
        public IBaseResponse Pay([FromBody] PaymentRequestDTO paymentRequestDTO)
        {
            ((PaymentService)_baseService).ClaimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            return _baseService.Excute(paymentRequestDTO);
        }

    }
}
