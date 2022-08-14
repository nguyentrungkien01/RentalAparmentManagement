using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Account
    {
        int id { get; set; }
        string firstName { get; set; }
        string lastName { get; set; }
        string gender { get; set; }
        string address { get; set; }
        string phoneNumber { get; set; }
        string idCard { get; set; }
        string email { get; set; }
        string password { get; set; }
        DateTime dateCreated { get; set; }
        int status { get; set; }
        int roleId { get; set; }
    }
}
