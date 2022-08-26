using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class StatisticService : BaseService<IBaseRequest, IBaseResponse>
    {
        public StatisticService()
        {
            _baseRepository = new StatisticRepository();
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            if(input is null)
            {
                return new CommonResponse
                {
                    Message = Message.INVALID,
                    Code = Code.INVALID
                };
            }
            return _baseRepository.Excute(input);
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
