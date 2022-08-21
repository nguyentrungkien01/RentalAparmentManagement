using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class CheckUniqueAccountRepository 
    {
        RentalApartmentManagementContext _dtContext;

        public CheckUniqueAccountRepository()
        {
            _dtContext = new RentalApartmentManagementContext();
        }

        public Boolean CheckPhoneNumber(string phoneNumber)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.PhoneNumber == phoneNumber) is null)
                return false;
            return true;
        }

        public Boolean CheckIdCard(string idCard)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.IdCard == idCard) is null)
                return false;
            return true;
        }

        public Boolean CheckEmail(string email)
        {
            if (_dtContext.Account.FirstOrDefault(s => s.Email == email) is null)
                return false;
            return true;
        }

    }
}
