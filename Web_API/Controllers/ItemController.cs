using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.WebEncoders.Testing;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ItemController : ControllerBase
    {


        [HttpGet]
        public List<Item> RetrieveAllItem()
        {
            var cm = new ItemManagement();

            return cm.RetrieveAllItem();

        }


        [HttpGet]
        public Item RetrieveByIdItem(int id)
        {
            var cm = new ItemManagement();

            var item = new Item()
            {
                id = id
            };

            return cm.RetrieveByIdItem(item);
        }

        [HttpPost]
        public IActionResult CreateItem(Item c)
        {
            try
            {
                var cm = new ItemManagement();

                cm.CreateItem(c);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateItem(Item c)
        {
            try
            {
                var cm = new ItemManagement();

                cm.UpdateItem(c);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateArchivo(Archivo c)
        {
            try
            {
                var cm = new ItemManagement();

                cm.UpdateArchivo(c);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        [HttpDelete]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                var cm = new ItemManagement();

                var item = new Item()
                {
                    id = id
                };

                cm.DeleteItem(item);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        public List<Item> RetrieveAllBySucursal(int id_sucursal)
        {
            var cm = new ItemManagement();

            return cm.RetrieveAllBySucursal(id_sucursal);

        }

        [HttpGet]
        public List<Item> RetrieveAllByTipo(string tipo)
        {
            var cm = new ItemManagement();

            return cm.RetrieveAllByTipo(tipo);

        }

        [HttpGet]
        public Archivo RetrieveItemArchivo(int id)
        {
            var cm = new ItemManagement();

            var archivo = new Archivo()
            {
                Id = id
            };

            return cm.RetrieveItemArchivo(archivo);
        }


    }
}