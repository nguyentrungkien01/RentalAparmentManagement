using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Rating
    {
        int accountId { get; set; }
        int postId { get; set; }
        int rateAmount { get; set; }
    }
}
