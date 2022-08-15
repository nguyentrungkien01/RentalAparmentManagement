using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Respone
{
    public class RoleResponeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<AccountResponeDTO> AccountDTOs { get; set; }
    }
}
