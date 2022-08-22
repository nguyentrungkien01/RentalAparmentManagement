using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public class PostGetListService : BaseService<IBaseRequest, IBaseResponse>
    {
        public PostGetListService()
        {
            _baseRepository = new PostGetListRepository();
        }
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
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
