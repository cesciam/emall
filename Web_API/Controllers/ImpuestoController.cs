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
    public class ImpuestoController : ControllerBase
    {
        [HttpGet]
        public List<Impuesto> ObtenerTodoImpuesto()
        {
            var im = new ImpuestoManagement();

            return im.RetrieveAll(); 
        }

        [HttpGet]

        public Impuesto ObtenerImpuesto(string nombre)
        {
            var im = new ImpuestoManagement();

            var impuesto = new Impuesto()
            {
                Nombre = nombre
            };

            return im.RetrieveById(impuesto);
        }

        [HttpPost]
        public IActionResult CrearImpuesto(Impuesto impuesto)
        {
            var im = new ImpuestoManagement();

            try
            {
                im.Create(impuesto);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500,e);
            }
        }

        [HttpPut]
        public IActionResult ModificarImpuesto(Impuesto impuesto)
        {
            var im = new ImpuestoManagement();

            try
            {
                im.Update(impuesto);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult EliminarImpuesto(Impuesto impuesto)
        {
            var im = new ImpuestoManagement();

            try
            {
                im.Delete(impuesto);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

    }
}