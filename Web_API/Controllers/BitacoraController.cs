using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BitacoraController : ControllerBase
    {

        [HttpGet]
        public List<Bitacora> ObtenerTodoBitacora()
        {
            var b = new BitacoraManagement();

            return b.RetrieveAll();
        }

        [HttpPost]
        public IActionResult CrearBitacora(Bitacora bitacora)
        {
            var b = new BitacoraManagement();

            try
            {
                b.Create(bitacora);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
