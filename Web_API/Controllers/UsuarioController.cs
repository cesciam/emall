using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AppCore;
using Entities;
using Entities.ViewModels;
using Utils;
using Utils.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Web_API.Controllers {

    public class UsuarioController : Controller {
        private UsuarioManagement usuarioManagement;
        private EmailService emailService;
        private readonly IConfiguration configuration;

        public UsuarioController(IConfiguration configuration, EmailService emailService) {
            this.usuarioManagement = new UsuarioManagement();
            this.emailService = emailService;
            this.configuration = configuration;
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
        [AllowAnonymous]
        [Route("api/[controller]/registrar")]
        public IActionResult Post([FromBody] RegistroViewModel registro) {
            if (registro == null)
                return BadRequest(new ErrorResultViewModel { message = "El formato de registro no es valido." });

            var errores = this.usuarioManagement.ComprobarErrores(registro);

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
                return BadRequest(new { message = "Error general al registrar el usuario. Vuelva a intertarlo en unos minutos." });
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
        [AllowAnonymous]
        [Route("api/[controller]/login")]
        public IActionResult Login([FromBody]LoginViewModel login) {
            var usuario = this.usuarioManagement.Login(login.Correo, login.Contrasena);

            if (usuario == null)
                return BadRequest(new { message = "Email o Contraseña son incorrectos." });

            return Ok(new {
                usuario,  
                token = GenerarTokenJWT(usuario)
            });
        }

        private string GenerarTokenJWT(Usuario usuario) {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var Header = new JwtHeader(signingCredentials);

            var Claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, usuario.Id.ToString()),
                new Claim("nombre", usuario.Nombre),
                new Claim("apellido", usuario.Apellido),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Correo)
            };

            var Payload = new JwtPayload(
                    issuer: configuration["JWT:Issuer"],
                    audience: configuration["JWT:Audience"],
                    claims: Claims,
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddHours(24)
                );

            var Token = new JwtSecurityToken(Header, Payload);

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }
    }
}
