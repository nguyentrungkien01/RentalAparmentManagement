using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public interface IBaseRepository<I, O>
    {
         public O Excute(I input);
    }
}
