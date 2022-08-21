using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Util
{
    public class CloudinaryUtil
    {
        private Cloudinary _cloudinary;

        public CloudinaryUtil(IConfiguration _configuration)
        {
            _cloudinary = new Cloudinary(new Account(_configuration["CloudinarySettings:CloudName"],
                                                                           _configuration["CloudinarySettings:ApiKey"],
                                                                           _configuration["CloudinarySettings:ApiSecret"]));
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
