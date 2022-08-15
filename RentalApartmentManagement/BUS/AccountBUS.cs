using DAL.Entity;
using DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BUS
{
    public class AccountBUS
    {
        public List<AccountDTO> getListAccount()
        {
            using(var context = new RentalApartmentManagementContext())
            {
                var accounts = context.Account.Include(acc => acc.Role).ToList();
                List<AccountDTO> accountDTOs = new List<AccountDTO>();
                foreach (var a in accounts)
                {
                    AccountDTO aDTO = new AccountDTO();
                    aDTO.Id = a.Id;
                    aDTO.FirstName = a.FirstName;
                    aDTO.LastName = a.LastName;
                    RoleDTO roleDTO = new RoleDTO();
                    roleDTO.Id = a.Role.Id;
                    roleDTO.Name = a.Role.Name;
                    aDTO.Role = roleDTO;
                    accountDTOs.Add(aDTO);
                }
                return accountDTOs;
            }
        }
    }
}
