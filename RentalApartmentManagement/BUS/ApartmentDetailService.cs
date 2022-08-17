﻿using DAL;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;
using Util.Constant;

namespace BUS
{
    public class ApartmentDetailService : BaseService<int, IBaseResponse>
    {
        private readonly IBaseRepository<int, IBaseResponse> _baseRepository;
        public ApartmentDetailService()
        {
            _baseRepository = new ApartmentDetailRepository();
        }

        protected override IBaseResponse doExcute(int input)
        {
            CommonResponse baseResponse = (CommonResponse)_baseRepository.excute(input);
            if (baseResponse.Data is null)
            {
                baseResponse.Message = Message.NOT_FOUND;
                baseResponse.Code = Code.NOT_FOUND;
            }
            else
            {
                baseResponse.Message = Message.OK;
                baseResponse.Code = Code.OK;
            }
            return baseResponse;
        }

        protected override void postExcute(int input)
        {
            //
        }

        protected override void preExcute(int input)
        {
            //
        }
    }
}
