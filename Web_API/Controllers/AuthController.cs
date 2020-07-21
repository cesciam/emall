using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppCore;
using Entities;
using Utils;

namespace Web_API.Controllers
{
    public class AuthController : Controller {
        private AuthManagement authManagement;

        public AuthController() {
            this.authManagement = new AuthManagement();
        }

        [HttpPost]
        [Route("api/[controller]/login")]
        public IActionResult Login([FromBody]LoginViewModel login) {
            var usuario = this.authManagement.Login(login.Correo, login.Contrasena);

            if (usuario == null)
                return BadRequest(new { message = "Email o Contraseña son incorrectos." });

            return Ok(usuario);
            
        }
    }
}