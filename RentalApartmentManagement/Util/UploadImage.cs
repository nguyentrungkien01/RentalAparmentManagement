using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Util.Constant;

namespace Util
{
    public class UploadImage
    {
        private string cloundName= CloudinaryKey.CLOUD_NAME;
        private string apiKey = CloudinaryKey.API_KEY;
        private string apiSecret = CloudinaryKey.API_SECRET;
        private Account myAccount;
        private Cloudinary _cloudinary;

        public UploadImage()
        {
            myAccount = new Account(cloundName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(myAccount);
            _cloudinary.Api.Secure = true;
        }

        public string UploadToCloudinary(IFormFile file)
        {
             try
            { 
                byte[] bytes;
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }
                string base64 = Convert.ToBase64String(bytes);
                var prefix = @"data:image/png;base64,";
                var imagePath = prefix + base64;

                // create a new ImageUploadParams object and assign the directory name
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath),
                    Folder = "RentalApartmenntManagement"
                };
                var uploadResult = _cloudinary.Upload(@uploadParams);
                return uploadResult.SecureUrl.AbsoluteUri;
            }
            catch (Exception)
            {
                return "up load failed";
            }
        }
    }
}
