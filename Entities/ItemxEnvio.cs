using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class ItemxEnvio : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idItem")]
        public int IdItem { get; set; }
        [JsonPropertyName("idEnvio")]
        public int IdEnvio { get; set; }

        public ItemxEnvio() { }

    }
}
