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
        public O Excute(I input)
        {
            try
            {
                PreExcute(input);
                return DoExcute(input);
            }
            catch (Exception e) 
            {
                throw e;
            }
            finally
            {
                PostExcute(input);
            }
        }

        protected abstract void PreExcute(I input);

        protected abstract O DoExcute(I input);

        protected abstract void PostExcute(I input);
    }
}
