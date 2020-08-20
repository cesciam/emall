using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Transaccion : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("codigoTransaccion")]
        public string CodigoTransaccion { get; set; }
        [JsonPropertyName("tipoPago")]
        public string TipoPago { get; set; }
        [JsonPropertyName("monto")]
        public double Monto { get; set; }

        public Transaccion() { }
    }
}
