using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.WebEncoders.Testing;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MultaController : ControllerBase
    {

        [HttpPost]
        public IActionResult CreateMulta(Multa c)
        {
            try
            {
                var cm = new MultaManagement();

                cm.CreateMulta(c);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        public List<Multa> RetrieveByUser(int id_usuario)
        {
            var cm = new MultaManagement();
            return cm.ObtenerMultasUsuario(id_usuario);
        }

        [HttpDelete]
        public IActionResult DeleteMulta(int id_usuario)
        {

            var eliminado = new Multa();
            eliminado.id_usuario = id_usuario;

            try
            {
                var cm = new MultaManagement();



                cm.DeleteMulta(eliminado);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


    }
}
