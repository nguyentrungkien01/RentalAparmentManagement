﻿using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public class UserDetailService : BaseService<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse doExcute(IBaseRequest input)
        {
            throw new NotImplementedException();
        }

        protected override void postExcute(IBaseRequest input)
        {
           // do nothing
        }

        protected override void preExcute(IBaseRequest input)
        {
            // do nothing
        }
    }
}