using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class OrderDetail
    {
        int postId { get; set; }
        int accountId { get; set; }
        DateTime orderDate { get; set; }
        int monthAmount { get; set; }
        Decimal priceTotal { get; set; }
    }
}
