using DAL;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public abstract class BaseService<I, O> : IBaseService<I, O>
    {
        protected IBaseRepository<I, O> _baseRepository;
        public O excute(I input)
        {
            try
            {
                preExcute(input);
                return doExcute(input);
            }
            catch (Exception e) 
            {
                throw e;
            }
            finally
            {
                postExcute(input);
            }
        }

        protected abstract void preExcute(I input);

        protected abstract O doExcute(I input);

        protected abstract void postExcute(I input);
    }
}
