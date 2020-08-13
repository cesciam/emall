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

    public class CalificacionController : Controller {
        private CalificacionManagement calificacionManagement;

        public CalificacionController(IConfiguration configuration) {
            this.calificacionManagement = new CalificacionManagement();
        }

        [HttpGet]
        [Route("api/[controller]")]
        public List<Calificacion> Index() {
            return this.calificacionManagement.RetrieveAll();
        }

        [HttpGet]
        [Route("api/[controller]/comercio/{id}")]
        public Calificacion GetByComercio(int id) {
            return this.calificacionManagement.RetrieveByComercioId(id);
        }

        [HttpGet]
        [Route("api/[controller]/item/{id}")]
        public Calificacion GetByItem(int id) {
            return this.calificacionManagement.RetrieveByItemId(id);
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post([FromBody] Calificacion calificacion) {
            if (calificacion == null)
                return BadRequest(new ErrorResultViewModel { message = "La calificacion no es valido." });

            this.calificacionManagement.Create(calificacion);
            return Ok();
        }
    }
}
