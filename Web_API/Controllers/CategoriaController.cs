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
    public class CategoriaController : ControllerBase
    {

        [HttpGet]
        public List<Categoria> ObtenerTodoCategoria()
        {
            var cm = new CategoriaManagement();

            return cm.RetrieveAll();
        }

        [HttpGet]

        public Categoria ObtenerCategoria(string nombre)
        {
            var cm = new CategoriaManagement();

            var categoria = new Categoria()
            {
                Nombre = nombre
            };

            return cm.RetrieveById(categoria);
        }

        [HttpPost]
        public IActionResult CrearCategoria(Categoria categoria)
        {
            var cm = new CategoriaManagement();

            try
            {
                cm.Create(categoria);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut]
        public IActionResult ModificarCategoria(Categoria categoria)
        {
            var cm = new CategoriaManagement();

            try
            {
                cm.Update(categoria);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult EliminarCategoria(Categoria categoria)
        {
            var cm = new CategoriaManagement();

            try
            {
                cm.Delete(categoria);
                return Ok(); //200
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}