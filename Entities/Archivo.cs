using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Archivo : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("enlace")]
        public string Enlace { get; set; }
        [JsonPropertyName("tipo")]
        public string Tipo { get; set; }
        [JsonPropertyName("id_comercio")]
        public int Id_Comercio { get; set; }

        public Archivo()
        {
        }
    }
}