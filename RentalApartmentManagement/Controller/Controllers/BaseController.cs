using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    [ApiController]
    [EnableCors("CorsApi")]
    public abstract class BaseController : ControllerBase
    {

    }
}
