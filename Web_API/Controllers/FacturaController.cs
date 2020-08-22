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
using Microsoft.CodeAnalysis.CSharp.Syntax;

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
            Promocion promocion = pago.Promocion;

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
                    NombreSucursal = sucursalEmpleado.Nombre,
                    CedulaJuridica = comercio.CedulaJuridica,
                    //Todo: Promociones
                    IdTransaccion = idTransaccion
                };

                if (promocion != null)
                {
                    factura.IdPromocion = promocion.id;
                    factura.NombrePromocion = promocion.nombre;
                    factura.Porcentaje = promocion.porcentaje;
                }

                var facturaDB = facturaManagement.Create(factura, envio);
                LineaFactura lineaFactura = new LineaFactura { IdFactura = facturaDB.Id };
                List<LineaFactura> lineasFactura = facturaManagement.RetrieveLineasxFactura(lineaFactura);

                HtmlToPdf htmlToPdf = new HtmlToPdf();

                Object[] pagoContainer = { factura, transaccion, lineasFactura };

                PdfDocument pdfDocument = htmlToPdf.ConvertHtmlString(GetHtmlString(pagoContainer));

                MemoryStream pdfStream = new MemoryStream();

                pdfDocument.Save(pdfStream);

                pdfStream.Position = 0;

                this.emailService.Send(new EmailModel
                {
                    To = cliente.Correo,
                    Subject = "Factura",
                    Message = "<p>Factura de " + comercio.Nombre + "</p>",
                    Attachment = new Attachment(pdfStream, "Factura.pdf")
                });

                return Ok();
            } catch (Exception e)
            {
                return BadRequest(new { message = "Ha ocurrido un error al registrar su pago. Inténtelo más tarde." });
            }
        }

        public List<Factura> ObtenerFacturasxUsuario(int idUsuario)
        {
            var factura = new Factura { IdUsuario = idUsuario };
            return facturaManagement.RetrieveFacturasxUsuario(factura);
        }

        public string GetHtmlString(Object[] pagoContainer)
        {
            Factura factura = (Factura)pagoContainer[0];
            Transaccion transaccion = (Transaccion)pagoContainer[1];

            string promocion = "Sin promoción";
            string porcentaje = "Sin promoción";

            if (factura.IdPromocion > 0)
            {
                promocion = factura.NombrePromocion;
                porcentaje = factura.Porcentaje.ToString();
            }

            string html = @"<!DOCTYPE html>
            <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>FACTURA</title>
                    <style>
                        header {
                            width: 70%;
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

                        .main-section {
                             width: 70%;
                             margin: auto;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Factura de comercio</h1>
                    </header>
                    <div class='main-section'>
                        <h2>Detalle de factura</h2>
        
                        <div class='detalleFactura'>
                            <p>Cédula jurídica del comercio: " + factura.CedulaJuridica + "</p>" +
                            "<p>Nombre de empleado: " + factura.NombreEmpleado + " " + factura.ApellidoEmpleado + "</p>" +
                            "<p>Cédula de cliente: " + factura.CedulaUsuario + "</p>" +
                            "<p>Nombre de cliente: " + factura.NombreUsuario + " " + factura.ApellidoUsuario + "</p>" +
                            "<p>Items:</p>" + GetStringLineasFactura((List<LineaFactura>)pagoContainer[2]) +
                            "<p>Nombre de sucursal: " + factura.NombreSucursal + "</p>" +
                            "<p>Promoción: " + promocion + "</p>" +
                            "<p>Porcentaje de promoción: " + porcentaje + "</p>" +
                            "<p>Total: ₡" + transaccion.Monto + "</p>" +
                        "</div>"+
                    "</div>" +
                "</body>" +
            "</html>";

            return html;
        }

        public string GetStringLineasFactura(List<LineaFactura> lineasFactura)
        {
            string lineas = "";

            foreach(var linea in lineasFactura) {
                lineas = lineas + @"<p>Item: " + linea.NombreItem + "</p>\n" +
                    "<p>Cantidad: " + linea.CantidadItem + "</p>\n" +
                    "<p>Precio: " + linea.PrecioItem + "</p>\n";
            }

            return lineas;
        }
    }
}
