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
using SelectPdf;
using System.IO;
using System.Net.Mail;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private UsuarioManagement usuarioManagement;
        private SucursalManagement sucursalManagement;
        private ComercioManagement comercioManagement;
        private TransaccionManagement transaccionManagement;
        private FacturaManagement facturaManagement;
        private EmpleadoManagement empleadoManagement;
        private EmailService emailService;

        public FacturaController(EmailService emailService)
        {
            this.usuarioManagement = new UsuarioManagement();
            this.sucursalManagement = new SucursalManagement();
            this.comercioManagement = new ComercioManagement();
            this.transaccionManagement = new TransaccionManagement();
            this.facturaManagement = new FacturaManagement();
            this.empleadoManagement = new EmpleadoManagement();
            this.emailService = emailService;
        }

        [HttpPost]
        public IActionResult CrearFactura(Pago pago)
        {
            Envio envio = pago.Envio;
            Transaccion transaccion = pago.Transaccion;
            transaccion.CodigoTransaccion = new Random().Next(100000000).ToString();
            try
            {
                int idTransaccion = transaccionManagement.Create(transaccion);

                var empleado = new Empleado { id = envio.IdEmpleado };
                empleado = empleadoManagement.RetrieveById(empleado);

                var usuarioEmpleado = new Usuario { Id = empleado.id_usuario };
                usuarioEmpleado = usuarioManagement.RetrieveById(usuarioEmpleado);

                var cliente = new Usuario { Id = envio.IdCliente };
                cliente = usuarioManagement.RetrieveById(cliente);

                var sucursalEmpleado = sucursalManagement.ObtenerSucursalPorEmpleado(usuarioEmpleado);

                var comercio = new Comercio { Id = sucursalEmpleado.IdComercio };
                comercio = comercioManagement.ObtenerComercio(comercio);

                var factura = new Factura
                {
                    IdUsuario = cliente.Id,
                    IdEmpleado = empleado.id,
                    NombreEmpleado = usuarioEmpleado.Nombre,
                    ApellidoEmpleado = usuarioEmpleado.Apellido,
                    CedulaUsuario = cliente.Cedula,
                    NombreUsuario = cliente.Nombre,
                    ApellidoUsuario = cliente.Apellido,
                    TelefonoUsuario = cliente.Telefono,
                    CorreoUsuario = cliente.Correo,
                    //Todo: Direcciones
                    NombreSucursal = sucursalEmpleado.Nombre,
                    CedulaJuridica = comercio.CedulaJuridica,
                    //Todo: Promociones
                    IdTransaccion = idTransaccion
                };

                var facturaDB = facturaManagement.Create(factura, envio);

                HtmlToPdf htmlToPdf = new HtmlToPdf();

                BaseEntity[] pagoContainer = { factura, transaccion };

                PdfDocument pdfDocument = htmlToPdf.ConvertHtmlString(GetHtmlString(pagoContainer));

                MemoryStream pdfStream = new MemoryStream();

                pdfDocument.Save(pdfStream);

                pdfStream.Position = 0;

                this.emailService.Send(new EmailModel
                {
                    To = cliente.Correo,
                    Subject = "FACTURA",
                    Message = "<p>Factura de " + comercio.Nombre + "</p>"
                }, new Attachment(pdfStream, "Factura.pdf"));

                return Ok();
            } catch (Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al registrar su pago. Inténtelo más tarde." });
            }
        }

        public string GetHtmlString(BaseEntity[] pagoContainer)
        {
            Factura factura = (Factura)pagoContainer[0];
            Transaccion transaccion = (Transaccion)pagoContainer[1];

            string html = @"<!DOCTYPE html>
            <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>FACTURA</title>
                    <style>
                        header {
                            margin: auto;
                        }
                        header h1 {
                            font-size: 25px;
                        }
                        .detalleFactura{
                            text-align: left;
                        }
                        html{
                            font-family: Arial, Helvetica, sans-serif;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Factura de comercio</h1>
                    </header>
                    <div>
                        <h2>Detalle de factura</h2>
        
                        <div class='detalleFactura'>
                            <p>Cédula jurídica del comercio: " + factura.CedulaJuridica + "</p>" +
                            "<p>Nombre de empleado: " + factura.NombreEmpleado + " " + factura.ApellidoEmpleado + "</p>" +
                            "<p>Cédula de cliente: " + factura.CedulaUsuario + "</p>" +
                            "<p>Nombre de cliente: " + factura.NombreUsuario + " " + factura.ApellidoUsuario + "</p>" +
                            "<p>Nombre de sucursal: " + factura.NombreSucursal + "</p>" +
                            "<p>Total: " + transaccion.Monto + "</p>" +
                        "</div>"+
                    "</div>" +
                "</body>" +
            "</html>";

            return html;
        }
    }
}
