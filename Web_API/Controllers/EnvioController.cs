using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Utils.Email;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EnvioController : ControllerBase
    {
        private EnvioManagement envioManagement;
        private EmailService emailService;

        public EnvioController(EmailService emailService)
        {
            this.envioManagement = new EnvioManagement();
            this.emailService = emailService;
        }

        [HttpPost]
        public IActionResult CrearEnvio(Envio envio)
        {
            int codigoRandom = new Random().Next(100000000);
            envio.Codigo = codigoRandom.ToString();

            try
            {
                this.envioManagement.Create(envio);
                return Ok();
            } catch(Exception e)
            {
                return BadRequest(new { message = "Algo salió mal al registrar su envío" });
            }
        }

        [HttpPut]
        public IActionResult EnvioExitoso(Envio envio)
        {
            try
            {
                this.envioManagement.Update(envio);

                Usuario usuario = new Usuario { Id = envio.IdCliente };

                usuario = new UsuarioManagement().RetrieveById(usuario);

                this.emailService.Send(new EmailModel
                {
                    To = usuario.Correo,
                    Subject = "Pago de ítems",
                    Message = "<p>Para pagar por sus ítems debe entrar al siguiente enlace.</p>" +
                             "<a href="+ "http://localhost:4000/realizar-pago?pago=" + envio.Id + ">Click aquí para pagar.</a>"
                });

                return Ok();
            } catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet]
        public Envio ObtenerEnvio(int id)
        {
            Envio envio = new Envio { Id = id };

            return this.envioManagement.ObtenerEnvio(envio);
        }
    }
}
