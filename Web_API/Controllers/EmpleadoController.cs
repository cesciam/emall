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
    public class EmpleadoController : ControllerBase
    {
        [HttpGet]
        public List<Empleado> RetrieveAllDatos()
        {
            var em = new EmpleadoManagement();
            return em.RetrieveAllDatos();
        }

        [HttpGet]
        public List<Empleado> RetrieveAll()
        {
            var em = new EmpleadoManagement();
            return em.RetrieveAll();
        }

        [HttpGet]
        public Empleado RetrieveById(int id)
        {
            var em = new EmpleadoManagement();
            var cuenta = new Empleado()
            {
                id = id
            };

            return em.RetrieveById(cuenta);
        }
        [HttpPost]
        public IActionResult Create(Empleado c)
        {
            try
            {
                var em = new EmpleadoManagement();
                em.Create(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(Empleado c)
        {
            try
            {
                var em = new EmpleadoManagement();
                em.Update(c);
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
                var c = new Empleado
                {
                    id = id
                };
                var em = new EmpleadoManagement();
                em.Delete(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}
