using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppCore;
using Entities;

namespace Web_API.Controllers {

    public class UsuarioController : Controller {
        private UsuarioManagement usuarioManagement;

        public UsuarioController() {
            this.usuarioManagement = new UsuarioManagement();
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

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post([FromBody] Usuario usuario) {
            if (usuario == null)
                return BadRequest("Usuario no es valido");

            this.usuarioManagement.Create(usuario);

            return Ok();
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
    }
}