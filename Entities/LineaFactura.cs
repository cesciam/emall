using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class LineaFactura : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idItem")]
        public int IdItem { get; set; }
        [JsonPropertyName("nombreItem")]
        public string NombreItem { get; set; }
        [JsonPropertyName("cantidadItem")]
        public int CantidadItem { get; set; }
        [JsonPropertyName("precioItem")]
        public double PrecioItem { get; set; }
        [JsonPropertyName("impuesto")]
        public double Impuesto { get; set; }
        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }
    }
}
