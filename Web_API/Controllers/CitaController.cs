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
    public class CitaController : ControllerBase
    {

        private CitaManagement mng = new CitaManagement();


        [HttpPost]
        public IActionResult registro(Cita cita)
        {
            if (mng.Create(cita) > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Error general al registrar la cita. Vuelva a intertarlo en unos minutos." });
            }

        }

    }
}
