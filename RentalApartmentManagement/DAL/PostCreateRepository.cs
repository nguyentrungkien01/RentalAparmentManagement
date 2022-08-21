using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using Util;
using Util.Constant;

namespace DAL
{
    public class PostCreateRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        private readonly IConfiguration _configuration;
        public PostCreateRepository(IConfiguration configuration)
        {
           _configuration = configuration;
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            CloudinaryUtil cloudinaryUtil = new CloudinaryUtil(_configuration);
            var req = (PostCreateRequestDTO)input;
            var baseResponse = new CommonResponse();
            using (IDbContextTransaction transaction = _dtContext.Database.BeginTransaction())
            {
                try
                {
                    Post post = new Post();
                    post.Title = req.Title;
                    post.Content = req.Content;
                    post.PricePerMonth = req.PricePerMonth;
                    post.Address = req.Address;
                    post.Longitude = req.Longitude;
                    post.Latitude = req.Latitude;
                    post.AccountId = req.AccountId;
                    post.DateCreated = DateTime.Now;
                    post.Status = 0;
                    _dtContext.Add(post);
                    _dtContext.SaveChanges();

                    string path = "";
                    foreach (var f in req.formFiles)
                    {
                        path = cloudinaryUtil.UploadToCloudinary(f);
                        if (!path.Equals("up load failed"))
                        {
                            Image img = new Image();
                            img.Path = path;
                            img.PostId = post.Id;
                            _dtContext.Add(img);
                            _dtContext.SaveChanges();
                        }
                    }
                    baseResponse.Code = Code.OK;
                    baseResponse.Message = Message.OK;
                    transaction.Commit();
                }
                catch (Exception)
                {
                    baseResponse.Code = Code.INVALID;
                    baseResponse.Message = Message.SQL_EXCEPTION;
                    transaction.Rollback();
                }
            }
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
           //
        }

        protected override void PreExcute(IBaseRequest input)
        {
            //
        }
    }
}
