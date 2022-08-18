using DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public abstract class BaseRepository<I, O>: IBaseRepository<I, O>
    {
        protected readonly RentalApartmentManagementContext _dtContext = 
            new RentalApartmentManagementContext();
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
