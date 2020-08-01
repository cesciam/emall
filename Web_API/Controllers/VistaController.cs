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
    public class VistaController : ControllerBase
    {
        [HttpGet]
        public List<Vista> RetrieveAll()
        {
            var vm = new VistaManagement();
            return vm.RetrieveAll();
        }

        [HttpGet]
        public Vista RetrieveById(int id)
        {
            var vm = new VistaManagement();
            var vista = new Vista()
            {
                id = id
            };

            return vm.RetrieveById(vista);
        }

        [HttpGet]
        public List<Vista> RetrieveByUsuario(int id)
        {
            var vm = new VistaManagement();
            var u = new Usuario()
            {
                Id = id
            };

            return vm.RetrieveByUsuario(u);
        }
        [HttpPost]
        public IActionResult Create(Vista v)
        {
            try
            {
                var vm = new VistaManagement();
                vm.Create(v);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(Vista v)
        {
            try
            {
                var vm = new VistaManagement();
                vm.Update(v);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Delete(Vista v)
        {
            try
            {
                var vm = new VistaManagement();
                vm.Delete(v);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
