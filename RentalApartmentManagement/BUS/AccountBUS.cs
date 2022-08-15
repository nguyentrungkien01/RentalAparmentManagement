using DAL.Entity;
using DTO.Respone;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BUS
{
    public class AccountBUS
    {
        public List<AccountResponeDTO> getListAccount()
        {
            using(var context = new RentalApartmentManagementContext())
            {
                var accounts = context.Account.Include(acc => acc.Role).ToList();
                List<AccountResponeDTO> accountDTOs = new List<AccountResponeDTO>();
                foreach (var a in accounts)
                {
                    AccountResponeDTO aDTO = new AccountResponeDTO();
                    aDTO.Id = a.Id;
                    aDTO.FirstName = a.FirstName;
                    aDTO.LastName = a.LastName;
                    RoleResponeDTO roleDTO = new RoleResponeDTO();
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
