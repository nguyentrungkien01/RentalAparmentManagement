using DTO.Request;
using DTO.Respone;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Util.Constant;

namespace Util
{
    public class MomoUtil
    {
        public string AccessKey { get; set; }
        public string PartnerCode { get; set; }

        public string SecretKey { get; set; }

        public string ApiUrl { get; set; }
        public IBaseResponse CreateMomoPayment(IBaseRequest baseRequest)
        {
            var request = (MomoRequestDTO)baseRequest;
            if (request is null || request.Items is null || request.UserInfo is null ||
                String.IsNullOrEmpty(request.NotifyUrl) || String.IsNullOrEmpty(request.ReturnUrl))
                return new CommonResponse
                {
                    Message = Message.INVALID_REQUEST,
                    Code = Code.INVALID_REQUEST
                };
            var requestId = Guid.NewGuid().ToString();
            var orderId = Guid.NewGuid().ToString();
            var requestType = "captureWallet";
            var autoCapture = true;
            var extraData = "";
            var partnerName = "OU apartments";
            var rawSignature = "accessKey=" + AccessKey +
                    "&amount=" + request.TotalMoney +
                    "&extraData=" + extraData +
                    "&ipnUrl=" + request.NotifyUrl +
                    "&orderId=" + orderId +
                    "&orderInfo=" + request.OrderInfo +
                    "&partnerCode=" + PartnerCode +
                    "&redirectUrl=" + request.ReturnUrl +
                    "&requestId=" + requestId +
                    "&requestType=" + requestType;
            string signature = EncryptHMACSHA256(SecretKey, rawSignature);
            JObject message = new JObject
            {
                { "partnerCode", PartnerCode },
                { "partnerName",  partnerName },
                { "storeId", PartnerCode },
                { "requestType", requestType },
                { "ipnUrl", request.NotifyUrl },
                { "redirectUrl", request.ReturnUrl },
                { "orderId", orderId },
                { "amount", request.TotalMoney },
                { "autoCapture", autoCapture },
                { "accessKey", AccessKey },
                { "requestId", requestId },
                { "orderInfo", request.OrderInfo },
                { "extraData", extraData },
                { "signature", signature },
                {"items", JToken.FromObject(request.Items) },
                {"userInfo", JToken.FromObject(request.UserInfo) }
            };
            string response = SendRequestAsync(ApiUrl, message.ToString()).Result;
            JObject resMessage = JObject.Parse(response);
            return new CommonResponse
            {
                Data = resMessage,
                Message = Message.OK,
                Code = Code.OK
            };
        }

        private string EncryptHMACSHA256(string secret, string message)
        {
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] keyBytes = encoding.GetBytes(secret);
            byte[] messageBytes = encoding.GetBytes(message);
            HMACSHA256 cryptographer = new HMACSHA256(keyBytes);
            byte[] bytes = cryptographer.ComputeHash(messageBytes);
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }

        private async Task<string> SendRequestAsync(string uri, string body)
        {
            using var client = new HttpClient();
            var httpRequestMessage = new HttpRequestMessage
            {
                RequestUri = new Uri(uri),
                Method = HttpMethod.Post,
                Content = new StringContent(body, Encoding.UTF8, "application/json")
            };
            var response = await client.SendAsync(httpRequestMessage);
            return await response.Content.ReadAsStringAsync();
        }
    }
}
