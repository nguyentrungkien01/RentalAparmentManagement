using System;
using System.Collections.Generic;
using System.Text;

namespace BUS
{
    public interface IBaseService<I, O>
    {
       public O Excute(I input);
    }
}
