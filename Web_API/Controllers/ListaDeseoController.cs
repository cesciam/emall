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
    public class ListaDeseoController : ControllerBase
    {

        [HttpPost]
        public IActionResult CreateLista(ListaDeseo c)
        {
            try
            {
                var cm = new ListaDeseoManagement();

                cm.CreateLista(c);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        public ListaDeseo RetrieveByUser(int id_usuario)
        {
            var cm = new ListaDeseoManagement();
            return cm.RetrieveListaUsuario(id_usuario);
        }

        [HttpDelete]
        public IActionResult DeleteLista(int id_usuario, int id_item)
        {

            var eliminado = new ListaDeseo();
            eliminado.id_usuario = id_usuario;
            eliminado.id_item = id_item;

            try
            {
                var cm = new ListaDeseoManagement();

                

                cm.DeleteLista(eliminado);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


    }
}
