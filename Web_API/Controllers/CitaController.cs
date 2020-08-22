using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Entities.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CitaController : ControllerBase    
    {

        private CitaManagement mng = new CitaManagement();


        [HttpPost]
        public IActionResult RegistrarCitaServicio(Cita cita)
        {
            if (mng.CreateCitaServicio(cita) > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Error general al registrar la cita. Vuelva a intertarlo en unos minutos." });
            }

        }

        [HttpPost]
        public IActionResult RegistrarCitaProducto(Cita cita)
        {
            
            if (mng.CreateCitaProducto(cita) > 0)
            {
                return Ok();
            }
            else
            {
            return BadRequest(new { message = "Error general al registrar la cita. Vuelva a intertarlo en unos minutos." });
            }

        }

        [HttpGet]
        public List<CitaViewModel> CitaPorUsuario(int id, DateTime fecha)
        {
            var cita = new Cita
            {
                id_cliente = id,
                fecha = fecha
            };
           return mng.RetrieveCitasCliente(cita);
        }

        [HttpGet]
        public List<CitaEmpleViewModel> CitaPorEmpleado(int id, DateTime fecha)
        {
            var cita = new Cita
            {
                id_empleado = id,
                fecha = fecha
            };
            return mng.RetrieveCitasEmpleado(cita);
        }

        [HttpGet]
        public List<CitaComerModelView> CitaPorComercio(int id, DateTime fecha)
        {
            var cita = new Cita
            {
                id_comercio = id,
                fecha = fecha
            };
            return mng.RetrieveCitasComercio(cita);
        }

        [HttpGet]
        public List<CitaComerModelView> CitaPorSucursal(int id, DateTime fecha)
        {
            var cita = new Cita
            {
                id_sucursal = id,
                fecha = fecha
            };
            return mng.RetrieveCitasSucursal(cita);
        }

        [HttpGet]
        public Cita ObtenerCita(int id)
        {
            var cita = new Cita
            {
                id = id
            };
            return mng.Retrieve(cita);
        }
    }
}
