﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controller.Controllers
{
    [ApiController]
    [EnableCors("CorsApi")]
    [Route("api/[controller]")]
    public abstract class BaseController : ControllerBase
    {

    }
}
