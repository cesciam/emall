﻿using System;
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
    public class SucursalController : ControllerBase
    {
        [HttpPost]
        public IActionResult CrearSucursal(Sucursal sucursal)
        {
            if(sucursal.Latitud.Length == 0 || sucursal.Longitud.Length == 0)
            {
                return BadRequest(new { message = "Ingrese una ubicación en el mapa." });
            }

            try
            {
                new SucursalManagement().CrearSucursal(sucursal);
                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al registrar. Vuelva a intentarlo más tarde" });
            }
        }
        [HttpGet]
        public List<Sucursal> ObtenerTodoSucursal(int idComercio)
        {
            var sucursal = new Sucursal { IdComercio = idComercio };
            return new SucursalManagement().ObtenerTodoSucursal(sucursal);
        }
        [HttpGet]
        public Sucursal ObtenerSucursal(int id)
        {
            var sucursal = new Sucursal { Id = id };
            return new SucursalManagement().ObtenerSucursal(sucursal);
        }
        [HttpPut]
        public IActionResult ModificarSucursal(Sucursal sucursal)
        {
            if (sucursal.Latitud.Length == 0 || sucursal.Longitud.Length == 0)
            {
                return BadRequest(new { message = "Ingrese una ubicación en el mapa." });
            }

            try
            {
                new SucursalManagement().ModificarSucursal(sucursal);
                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al editar. Vuelva a intentarlo más tarde" });
            }
        }

        [HttpDelete]
        public IActionResult EliminarSucursal(int id)
        {
            try
            {
                var sucursal = new Sucursal { Id = id };
                new SucursalManagement().EliminarSucursal(sucursal);

                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Esta sucursal tiene ligados productos, empleados u horarios, elíminelos y vuelva a intentarlo." });
            }
        }
    }
}
