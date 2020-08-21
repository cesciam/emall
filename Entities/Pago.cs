using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Pago : BaseEntity
    {
        [JsonPropertyName("envio")]
        public Envio Envio { get; set; }
        [JsonPropertyName("transaccion")]
        public Transaccion Transaccion { get; set; }
        [JsonPropertyName("promocion")]
        public Promocion Promocion { get; set; }
        public Pago() { }
    }
}
