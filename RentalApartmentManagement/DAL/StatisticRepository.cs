using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Util.Constant;

namespace DAL
{
    public class StatisticRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            try
            {
                var req = (StatisticRequestDTO)input;
                var res = _dtContext.Post.Select(s => s).OrderByDescending(x => x.LikeAmount).Take(req.Amount).ToList();
                return new CommonResponse
                {
                    Data = res,
                    Message = Message.OK,
                    Code = Code.OK
                };
            }
            catch
            {
                return new CommonResponse
                {
                    Message = Message.SQL_EXCEPTION,
                    Code = Code.NOT_FOUND
                };
            }

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
