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
    public class HorarioController : ControllerBase
    {
        [HttpGet]
        public List<Horario> RetrieveAll()
        {
            var hm = new HorarioManagement();
            return hm.RetrieveAll();
        }

        [HttpGet]
        public Horario RetrieveById(int id)
        {
            var hm = new HorarioManagement();
            var h = new Horario()
            {
                id = id
            };

            return hm.RetrieveById(h);
        }
        [HttpPost]
        public IActionResult Create(Horario c)
        {
            try
            {
                var hm = new HorarioManagement();
                hm.Create(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(Horario c)
        {
            try
            {
                var hm = new HorarioManagement();
                hm.Update(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Delete(Horario c)
        {
            try
            {
                var hm = new HorarioManagement();
                hm.Delete(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
