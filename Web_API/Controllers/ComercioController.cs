using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities;
using AppCore;
using Utils;
using Utils.Email;

namespace Web_API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {
        private EmailService emailService;
        public ComercioController(EmailService emailService)
        {
            this.emailService = emailService;
        }


        [HttpPost]
        public IActionResult CrearComercio(Comercio comercio)
        {
            if(comercio.IdAdmin == 0 || (comercio.Archivos.Length < 3))
            {
                return BadRequest(new { message = "Revise los campos del formulario." });
            }

            try
            {
                new ComercioManagement().CrearComercio(comercio);

                Usuario usuario = new Usuario { Id = comercio.IdAdmin };

                usuario = new UsuarioManagement().RetrieveById(usuario);

                this.emailService.Send(new EmailModel
                {
                    To = usuario.Correo,
                    Subject = "Registro de comercio",
                    Message = "<p>El comercio que ha registrado se encuentra en proceso de revisión por parte de los administradores de la aplicación.</p>" +
                             "<p>Dentro de poco recibirá un correo con el resultado de la revisión de su comercio.</p>"
                });


                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet]
        public List<Comercio> ObtenerTodoComercio()
        {
            return new ComercioManagement().ObtenerTodoComercio();
        }

        [HttpGet]
        public Comercio ObtenerComercio(int id)
        {
            Comercio comercio = new Comercio
            {
                Id = id
            };

            return new ComercioManagement().ObtenerComercio(comercio);
        }

        [HttpPut]
        public IActionResult ModificarComercio(Comercio comercio)
        {
            try
            {
                new ComercioManagement().ModificarComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult EliminarComercio(int id)
        {
            try
            {
                var comercio = new Comercio { Id = id };
                new ComercioManagement().EliminarComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }

        }

        [HttpPut]
        public IActionResult ModificarEstadoComercio(Comercio comercio)
        {
            try
            {
                new ComercioManagement().ModificarEstadoComercio(comercio);
                return Ok();
            } catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
