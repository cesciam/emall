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
    public class ConfiguracionController : ControllerBase
    {
        private ConfiguracionManagement mng = new ConfiguracionManagement();

        [HttpPost]
        public IActionResult Create(Configuracion c)
        {
            try
            {
                mng.Create(c);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        public Configuracion Retrieves(string nombre)
        {
            var configuracion = new Configuracion
            {
                nombre = nombre
            };

            return mng.Retrieve(configuracion);
        }

        [HttpGet]
        public List<Configuracion> RetrieveAll()
        {
            return mng.RetrieveAll();
        }

        [HttpPut]
        public IActionResult Update(Configuracion c)
        {
            try
            {
                mng.Update(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                Configuracion c = new Configuracion
                {
                    id = id
                };
                mng.Delete(c);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
