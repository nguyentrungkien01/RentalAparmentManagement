using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Post
    {
        int id { get; set; }
        string content { get; set; }
        decimal pricePerMonth { get; set; }
        string address { get; set; }
        int likeAmount { get; set; }
        int status { get; set; }
        string longitude { get; set; }
        string latitude { get; set; }
        DateTime dateCreated { get; set; }
        int accountId { get; set; }
    }
}
