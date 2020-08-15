using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AppCore;
using Entities;
using Entities.ViewModels;
using Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Web_API.Controllers {

    public class DireccionController : Controller {
        private DireccionManagement direccionManagement;
        private readonly IConfiguration configuration;

        public DireccionController(IConfiguration configuration) {
            this.direccionManagement = new DireccionManagement();
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public List<Direccion> Index() {
            return this.direccionManagement.RetrieveAll();
        }

        [HttpGet]
        [Route("api/[controller]/usuario/{id}")]
        public List<Direccion> GetByUser(int id) {
            return this.direccionManagement.RetrieveByUserId(id);
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public Direccion GetById(int id) {
            Direccion direccion = new Direccion();
            direccion.Id = id;

            return this.direccionManagement.RetrieveById(direccion);
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post([FromBody] Direccion direccion) {
            if (direccion == null)
                return BadRequest(new ErrorResultViewModel { message = "El formato de la direccion no es valido." });

            if (this.direccionManagement.Registrar(direccion) != 0)
                return Ok();
            else
                return BadRequest(new { message = "Error general al registrar la direccion. Vuelva a intertarlo en unos minutos." });
        }

        [HttpPut]
        [Route("api/[controller]")]
        public IActionResult Put([FromBody] Direccion direccion) {
            if (direccion == null)
                return BadRequest("Direccion no es valida");

            this.direccionManagement.Update(direccion);

            return Ok();
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(int id) {
            Direccion direccion = new Direccion { 
                Id = id
            };

            this.direccionManagement.Delete(direccion);

            return Ok();
        }

        [HttpGet]
        [Route("api/[controller]/provincia")]
        public List<Provincia> GetProvincias() {
            return this.direccionManagement.RetrieveProvincias();
        }

        [HttpGet]
        [Route("api/[controller]/canton/{provincia}")]
        public List<Canton> GetCantones(int provincia) {
            return this.direccionManagement.RetrieveCantones(provincia);
        }

        [HttpGet]
        [Route("api/[controller]/provincia/{provincia}/canton/{canton}/distrito")]
        public List<Distrito> GetDistritos(int provincia, int canton) {
            return this.direccionManagement.RetrieveDistritos(provincia, canton);
        }
    }
}
