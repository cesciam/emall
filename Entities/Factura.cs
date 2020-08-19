using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Factura : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }
        [JsonPropertyName("idUsuario")]
        public int IdUsuario { get; set; }
        [JsonPropertyName("idEmpleado")]
        public int IdEmpleado { get; set; }
        [JsonPropertyName("nombreEmpleado")]
        public string NombreEmpleado { get; set; }
        [JsonPropertyName("apellidoEmpleado")]
        public string ApellidoEmpleado { get; set; }
        [JsonPropertyName("cedulaUsuario")]
        public string CedulaUsuario { get; set; }
        [JsonPropertyName("nombreUsurio")]
        public string NombreUsuario { get; set; }
        [JsonPropertyName("apellidoUsuario")]
        public string ApellidoUsuario { get; set; }
        [JsonPropertyName("telefonoUsuario")]
        public string TelefonoUsuario { get; set; }
        [JsonPropertyName("correoUsuario")]
        public string CorreoUsuario { get; set; }
        [JsonPropertyName("nombreProvincia")]
        public string NombreProvincia { get; set; }
        [JsonPropertyName("nombreCanton")]
        public string NombreCanton { get; set; }
        [JsonPropertyName("nombreDistrito")]
        public string NombreDistrito { get; set; }
        [JsonPropertyName("detallesDireccion")]
        public string DetallesDireccion { get; set; }
        [JsonPropertyName("nombreSucursal")]
        public string NombreSucursal { get; set; }
        [JsonPropertyName("cedulaJuridica")]
        public string CedulaJuridica { get; set; }
        [JsonPropertyName("idTransaccion")]
        public int IdTransaccion { get; set; }
        [JsonPropertyName("idPromocion")]
        public int IdPromocion { get; set; }
        [JsonPropertyName("nombrePromocion")]
        public string NombrePromocion { get; set; }
        [JsonPropertyName("porcentaje")]
        public double Porcentaje { get; set; }
    }
}
