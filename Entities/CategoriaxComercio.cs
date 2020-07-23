using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class CategoriaxComercio : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idComercio")]
        public int IdComercio { get; set; }
        [JsonPropertyName("idCategoria")]
        public int IdCategoria { get; set; }
        [JsonPropertyName("nombreCategoria")]
        public string NombreCategoria { get; set; }
        [JsonPropertyName("cedulaJuridica")]
        public string CedulaJuridica { get; set; }
    
        public CategoriaxComercio() { }
    }
}
