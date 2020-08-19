using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities.ViewModels;

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

        [HttpGet]
        public List<Envio> RetrieveBySucursal(int sucursal)
        {
            var hm = new EnvioManagement();
            return hm.RetrieveBySucursal(sucursal);
        }

        [HttpGet]
        public List<EnvioListViewModel> RetrieveEnvioListBySucursal(int sucursal)
        {
            var hm = new EnvioManagement();
            return hm.RetrieveEnvioListBySucursal(sucursal);
        }

        [HttpGet]
        public Envio RetrieveById(int id)
        {
            var hm = new EnvioManagement();
            return hm.RetrieveById(id);
        }

        [HttpGet]
        public EnvioListViewModel RetrieveEnvioListByid(int id)
        {
            var hm = new EnvioManagement();
            return hm.RetrieveEnvioListByid(id);
        }

        [HttpPut]
        public IActionResult Update(Envio c)
        {
            try
            {
                var hm = new EnvioManagement();
                hm.Update(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
