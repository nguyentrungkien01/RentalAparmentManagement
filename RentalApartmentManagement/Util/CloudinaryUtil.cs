using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Util
{
    public class CloudinaryUtil
    {
        private readonly Cloudinary _cloudinary;
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
        public CloudinaryUtil()
        {
            _cloudinary = new Cloudinary(new Account(CloudName,ApiKey,ApiSecret));
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
