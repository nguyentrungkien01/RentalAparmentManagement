using BUS;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private AccountBUS accountBUS = new AccountBUS();
        [HttpGet]
        public IEnumerable<AccountDTO> getListAccount()
        {
            return accountBUS.getListAccount();
        }
    }
}
