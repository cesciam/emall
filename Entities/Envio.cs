using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Envio : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("estado")]
        public int Estado { get; set; }
        [JsonPropertyName("idEmpleado")]
        public int IdEmpleado { get; set; }
        [JsonPropertyName("idCliente")]
        public int IdCliente { get; set; }
        [JsonPropertyName("items")]
        public Item[] Items { get; set; }

        public Envio(){}
    }
}
