using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Sucursal : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("longitud")]
        public string Longitud { get; set; }
        [JsonPropertyName("latitud")]
        public string Latitud { get; set; }
        [JsonPropertyName("detallesDireccion")]
        public string DetallesDireccion { get; set; }
        [JsonPropertyName("idComercio")]
        public int IdComercio { get; set; }
        [JsonPropertyName("idHorario")]
        public int IdHorario { get; set; }

        public Sucursal()
        {
        }
    }
}
