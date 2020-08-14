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
    public class EnvioController : ControllerBase
    {
        private EnvioManagement envioManagement;

        public EnvioController()
        {
            this.envioManagement = new EnvioManagement();
        }

        [HttpPost]
        public IActionResult CrearEnvio(Envio envio)
        {
            try
            {
                this.envioManagement.Create(envio);
                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Algo salió mal al registrar su envío" });
            }
        }
    }
}
