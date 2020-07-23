using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AppCore;
using Entities;
using Entities.ViewModels;
using Utils;
using Utils.Email;

namespace Web_API.Controllers {

    public class UsuarioController : Controller {
        private UsuarioManagement usuarioManagement;
        private EmailService emailService;

        public UsuarioController(EmailService emailService) {
            this.usuarioManagement = new UsuarioManagement();
            this.emailService = emailService;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public List<Usuario> Index([FromQuery] Dictionary<string, string> filters) {
            if (filters.Count == 0)
                return this.usuarioManagement.RetrieveAll();

            return this.usuarioManagement.RetrieveSome(filters);
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public Usuario GetById(int id) {
            Usuario usuario = new Usuario();
            usuario.Id = id;

            return this.usuarioManagement.RetrieveById(usuario);
        }

        [HttpGet]
        [Route("api/[controller]/{id}/activar/{codigo}")]
        public IActionResult Activar(int id, string codigo) {
            if (this.usuarioManagement.Activar(id, codigo)) {
                return Ok("Usuario activado correctamente");
            } else {
                return BadRequest(new { message = "Ha ocurrido un error al activar el usuario." });
            }
        }

        [HttpPost]
        [Route("api/[controller]/registrar")]
        public IActionResult Post([FromBody] RegistroViewModel registro) {
            if (registro == null)
                return BadRequest(new ErrorResultViewModel { 
                    error = "El formato de registro no es valido."
                });

            var errores = this.usuarioManagement.TieneErrores(registro);

            if (errores != null)
                return BadRequest(errores);

            Usuario nuevoUsuario = new Usuario {
                Id = 0,
                Cedula = registro.Cedula,
                Nombre = registro.Nombre,
                Apellido = registro.Apellido,
                Correo =  registro.Correo,
                Telefono = registro.Telefono,
                Tipo = registro.Tipo,
                Estado = 0,
                Foto = 1,
                CorreoConfirmado = 0,
                TelefonoConfirmado = 0,
                CodigoTelefono = TokenGenerator.Generar(8),
                CodigoCorreo = TokenGenerator.Generar(8),
            };

            int usuarioId = this.usuarioManagement.Registrar(nuevoUsuario);

            if (usuarioId != 0) {
                this.usuarioManagement.CrearContrasena(registro.Contrasena, usuarioId);
                var url = "http://" + HttpContext.Request.Host.Value;

                //Envia email de activacion de cuenta
                this.emailService.Send(new EmailModel {
                    To = nuevoUsuario.Correo,
                    Subject = "Activar cuenta",
                    Message = "<p>Activar cuenta con el codigo: <strong>" + nuevoUsuario.CodigoCorreo + "</strong></p>" +
                              "<p><a href=\"" + url + "\">Activar cuenta</a></p>"
                });

                return Ok();
            } else {
                return BadRequest(new { message = "Ha ocurrido un error al registrar el usuario. Vuelva a intertarlo en unos minutos." });
            }
        }

        [HttpPut]
        [Route("api/[controller]")]
        public IActionResult Put([FromBody] Usuario usuario) {
            if (usuario == null)
                return BadRequest("Usuario no es valido");

            this.usuarioManagement.Update(usuario);

            return Ok();
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(int id) {
            this.usuarioManagement.Delete(id);
            
            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]/login")]
        public IActionResult Login([FromBody]LoginViewModel login) {
            var usuario = this.usuarioManagement.Login(login.Correo, login.Contrasena);

            if (usuario == null)
                return BadRequest(new { message = "Email o Contraseña son incorrectos." });

            return Ok(usuario);
        }
    }
}