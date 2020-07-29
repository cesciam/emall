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
    public class RolController : ControllerBase
    {
        [HttpGet]
        public List<Rol> RetrieveAll()
        {
            var rm = new RolManagement();
            return rm.RetrieveAll();
        }

        [HttpGet]
        public Rol RetrieveById(int id)
        {
            var rm = new RolManagement();
            var direccion = new Rol()
            {
                id = id
            };
            return rm.RetrieveById(direccion);
        }
        [HttpPost]
        public IActionResult Create(Rol c)
        {
            try
            {
                var rm = new RolManagement();
                rm.Create(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(Rol c)
        {
            try
            {
                var rm = new RolManagement();
                rm.Update(c);
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
                var rm = new RolManagement();
                var c = new Rol
                {
                    id = id
                };
                rm.Delete(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
