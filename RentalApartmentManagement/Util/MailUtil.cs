using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Util
{
    public class MailUtil
    {
        public static Boolean Send(string toEmail, string content)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("yolonguyenkiem.hcm@gmail.com");
                message.To.Add(new MailAddress(toEmail));
                message.Subject = "Test";
                message.IsBodyHtml = true;
                message.Body = content;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("yolonguyenkiem.hcm@gmail.com", "orrsrouzdrucorwu");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}
