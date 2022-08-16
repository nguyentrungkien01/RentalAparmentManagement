using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public abstract class BaseRepository<I, O>: IBaseRepository<I, O>
    {
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
