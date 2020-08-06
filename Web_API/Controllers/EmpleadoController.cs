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
    public class EmpleadoController : ControllerBase
    {
        private EmpleadoManagement em;
        private UsuarioManagement um;

        public EmpleadoController() {
            this.em = new EmpleadoManagement();
            this.um = new UsuarioManagement();
        }

        [HttpGet]
        public List<Empleado> RetrieveAllDatos()
        {
            return em.RetrieveAllDatos();
        }

        [HttpGet]
        public List<EmpleadoViewModel> RetrieveByComercioId(int comercio) {
            return em.RetrieveByComercioId(comercio);
        }

        [HttpGet]
        public List<Empleado> RetrieveAll()
        {
            return em.RetrieveAll();
        }

        [HttpGet]
        public Empleado RetrieveById(int id)
        {
            var cuenta = new Empleado()
            {
                id = id
            };

            return em.RetrieveById(cuenta);
        }

        [HttpGet]
        public EmpleadoViewModel RetrieveByIdViewModel(int id)
        {
            var cuenta = new Empleado()
            {
                id = id
            };

            return em.RetrieveByIdViewModel(cuenta);
        }

        [HttpPost]
        public IActionResult Create(RegistroEmpleadoViewModel registroEmpleado)
        {
            if (registroEmpleado == null)
                return BadRequest(new ErrorResultViewModel { message = "El formato de  empleado no es valido." });

            RegistroViewModel registroUsuario = new RegistroViewModel {
                Correo = registroEmpleado.Correo,
                Contrasena = Utils.TokenGenerator.Generar(8),
                Tipo = 4 // 4 = Empleado
            };

            int usuarioId = this.um.Registrar(registroUsuario, true);

            if (usuarioId != 0) {
                Empleado nuevoEmpleado = new Empleado {
                    id_rol = registroEmpleado.Rol,
                    id_sucursal = registroEmpleado.Sucursal,
                    id_usuario = usuarioId
                };

                this.em.Create(nuevoEmpleado);
                return Ok();
            } else {
                return BadRequest(new { message = "Error general al registrar el usuario. Vuelva a intertarlo en unos minutos." });
            }
        }

        [HttpPut]
        public IActionResult Update(int id_empleado, int id_rol, int id_sucursal)
        {
            try
            {
                var c = new Empleado
                {
                    id = id_empleado,
                    id_rol = id_rol,
                    id_sucursal = id_sucursal
                };
                em.Update(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var c = new Empleado
                {
                    id = id
                };
                em.Delete(c);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}
