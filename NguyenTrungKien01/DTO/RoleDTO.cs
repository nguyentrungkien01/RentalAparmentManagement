using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class RoleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<AccountDTO> AccountDTOs { get; set; }
    }
}
