using DTO.Request;
using DTO.Respone;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Util.Constant;

namespace DAL
{
    public class UserUpdateRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var req = (UserUpdateRequestDTO)input;
            var baseResponse = new CommonResponse();
            var account = _dtContext.Account.FirstOrDefault(s => s.Id == req.Id);
            using (IDbContextTransaction transaction = _dtContext.Database.BeginTransaction())
            {
                try
                {
                    if (account != null)
                    {
                        if (!string.IsNullOrEmpty(req.FirstName))
                            account.FirstName = req.FirstName;
                        if (!string.IsNullOrEmpty(req.LastName))
                            account.LastName = req.LastName;
                        if (!string.IsNullOrEmpty(req.PhoneNumber))
                            account.PhoneNumber = req.PhoneNumber;
                        if (!string.IsNullOrEmpty(req.Password))
                        {
                            MD5 mh = MD5.Create();
                            byte[] inputBytes = Encoding.ASCII.GetBytes(req.Password);
                            byte[] hash = mh.ComputeHash(inputBytes);
                            StringBuilder pass = new StringBuilder();
                            for (int i = 0; i < hash.Length; i++)
                                pass.Append(string.Format("{0:x2}", hash[i]));
                            account.Password = pass.ToString();
                        }
                        if (req.RoleId > 0)
                            account.RoleId = req.RoleId;
                        if (!string.IsNullOrEmpty(req.IdCard))
                            account.IdCard = req.IdCard;
                        if (!string.IsNullOrEmpty(req.Gender))
                            account.Gender = req.Gender;
                        if (req.Status != null)
                            account.Status = req.Status;
                        if (!string.IsNullOrEmpty(req.Email))
                            account.Email = req.Email;
                        if (!string.IsNullOrEmpty(req.Address))
                            account.Address = req.Address;
                        _dtContext.SaveChanges();
                        transaction.Commit();
                        baseResponse.Code = Code.OK;
                        baseResponse.Message = Message.OK;
                    }
                    else
                    {
                        baseResponse.Code = Code.NOT_FOUND;
                        baseResponse.Message = Message.NOT_FOUND;
                    }
                }
                catch (Exception)
                {
                    baseResponse.Code = Code.INVALID;
                    baseResponse.Message = Message.DUPLICATE;
                    transaction.Rollback();
                }
            }
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
           //do nothing
        }

        protected override void PreExcute(IBaseRequest input)
        {
            //do nothing
        }
    }
}
