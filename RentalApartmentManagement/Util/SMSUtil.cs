using System;
using System.Collections.Generic;
using System.Text;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Util
{
    public class SMSUtil
    {
        public string AccountSID { get; set; }

        public string AuthToken { get; set; }

        public void SendSMS(string from, string to, string message)
        {
            TwilioClient.Init(AccountSID, AuthToken);
            MessageResource.Create(
               body: message,
               from: new Twilio.Types.PhoneNumber(from),
               to: new Twilio.Types.PhoneNumber(to)
            );
        }
    }
}
