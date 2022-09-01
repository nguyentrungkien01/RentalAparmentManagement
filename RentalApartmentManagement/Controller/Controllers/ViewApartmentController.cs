using BUS;
using DTO.Request;
using DTO.Respone;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewApartmentController : BaseController
    {
        public ViewApartmentController()
        {
            _baseService = new ViewApartmentService();
        }

        [AllowAnonymous]
        [HttpGet]
        public IBaseResponse GetListApartment([FromQuery] ViewApartmentRequestDTO req)
        {
            return _baseService.Excute(req);
        }
    }
}
