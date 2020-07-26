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
    public class VistaXRolController : ControllerBase
    {
        [HttpGet]
        public List<VistaXRol> RetrieveAll()
        {
            var vrm = new VistaXRolManagement();
            return vrm.RetrieveAll();
        }

        [HttpGet]
        public VistaXRol RetrieveById(int id)
        {
            var vrm = new VistaXRolManagement();
            var credito = new VistaXRol()
            {
                id = id
            };
            return vrm.RetrieveById(credito);
        }
        [HttpPost]
        public IActionResult Create(VistaXRol c)
        {
            try
            {
                var vrm = new VistaXRolManagement();
                vrm.Create(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(VistaXRol c)
        {
            try
            {
                var vrm = new VistaXRolManagement();
                vrm.Update(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Delete(VistaXRol c)
        {
            try
            {
                var vrm = new VistaXRolManagement();
                vrm.Delete(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
