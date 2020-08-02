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

        [HttpGet]
        public List<VistaXRol> RetrieveByRol(int id)
        {
            var vrm = new VistaXRolManagement();
            var credito = new VistaXRol()
            {
                id_rol = id
            };
            return vrm.RetrieveByRol(credito);
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

        public IActionResult CreateWRol(VistaXRol c)
        {
            try
            {
                var vrm = new VistaXRolManagement();
                vrm.CreateWRol(c);
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

        [HttpDelete]
        public IActionResult Delete(int id_rol ,int id_vista )
        {
            try
            {
                var c = new VistaXRol
                {
                    id_rol = id_rol,
                    id_vista = id_vista
                };
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
