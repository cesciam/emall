using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities;
using AppCore;

namespace Web_API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {
        [HttpPost]
        public IActionResult CrearComercio(Comercio comercio)
        {
            try
            {
                new ComercioManagement().CrearComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet]
        public List<Comercio> ObtenerTodoComercio()
        {
            return new ComercioManagement().ObtenerTodoComercio();
        }

        [HttpGet]
        public Comercio ObtenerComercio(int id)
        {
            Comercio comercio = new Comercio
            {
                Id = id
            };

            return new ComercioManagement().ObtenerComercio(comercio);
        }

        [HttpPut]
        public IActionResult ModificarComercio(Comercio comercio)
        {
            try
            {
                new ComercioManagement().ModificarComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult EliminarComercio(int id)
        {
            try
            {
                var comercio = new Comercio { Id = id };
                new ComercioManagement().EliminarComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }

        }

        [HttpPut]
        public IActionResult ModificarEstadoComercio(Comercio comercio)
        {
            try
            {
                new ComercioManagement().ModificarEstadoComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
