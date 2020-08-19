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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {
        private EmailService emailService;
        public ComercioController(EmailService emailService)
        {
            this.emailService = emailService;
        }

        //public ComercioController()
        //{
        //}

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
            } catch(Exception)
            {
                return BadRequest(new { message = "Ha ocurrido un error al registrar. Vuelva a intentarlo más tarde" });
            }
        }

        [HttpGet]
        public List<Comercio> ObtenerTodoComercio()
        {
            return new ComercioManagement().ObtenerTodoComercio();
        }

        [HttpGet]
        public List<Comercio> ObtenerTodoComercioPendiente()
        {
            return new ComercioManagement().ObtenerTodoComercioPendiente();
        }

        [HttpGet]
        public List<Comercio> ObtenerComerciosAdmin(int IdAdmin)
        {
            var comercio = new Comercio { IdAdmin = IdAdmin };

            return new ComercioManagement().ObtenerTodoComercio(comercio);
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
                return BadRequest(new { message = "Ha ocurrido un error al editar. Vuelva a intentarlo más tarde" });
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
            } catch(Exception)
            {
                return BadRequest(new { message = "Este comercio tiene sucursales ligadas, elimínelas y vuelva a intentarlo." });
            }

        }

        [HttpPut]
        public IActionResult ModificarEstadoComercio(Comercio comercio)
        {
            Usuario usuario = new Usuario { Id = comercio.IdAdmin };
            usuario = new UsuarioManagement().RetrieveById(usuario);
            try
            {
                new ComercioManagement().ModificarEstadoComercio(comercio);
                

                if (comercio.Estado == 1)
                {
                    usuario.Tipo = 3;
                    new UsuarioManagement().Update(usuario);

                    this.emailService.Send(new EmailModel
                    {
                        To = usuario.Correo,
                        Subject = "Aprobación de comercio",
                        Message = "<p>El comercio " + comercio.NombreLegal + " ha sido aprobado.</p>" +
                             "<p>Ahora puede hacer uso de la aplicación como un administrador de comercio.</p>"
                    });
                } else
                {
                    new ComercioManagement().EliminarComercio(comercio);

                    this.emailService.Send(new EmailModel
                    {
                        To = usuario.Correo,
                        Subject = "Aprobación de comercio",
                        Message = "<p>El comercio " + comercio.NombreLegal + " ha sido rechazado.</p>" +
                             "<p>Puede volver a intentarlo hasta cumplir con los requisitos de aprobación.</p>"
                    });
                }


                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al modificar este comercio. Vuelva a intentarlo más tarde." });
            }
        }

        [HttpPost]
        public IActionResult AgregarArchivoComercio(Comercio comercio)
        {
            if(comercio.Archivos.Length == 0)
            {
               return BadRequest(new { message = "Ingrese un archivo." });
            }

            var tmpComercio = ObtenerComercio(comercio.Id);
            comercio.CedulaJuridica = tmpComercio.CedulaJuridica;
            try
            {
                new ComercioManagement().AgregarArchivoComercio(comercio);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al registrar el archivo. Vuelva a intentarlo más tarde." });
            }
        }
    }
}
