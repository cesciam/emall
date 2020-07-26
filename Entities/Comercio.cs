using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Comercio : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idAdmin")]
        public int IdAdmin { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("nombreLegal")]
        public string NombreLegal { get; set; }
        [JsonPropertyName("cedulaJuridica")]
        public string CedulaJuridica { get; set; }
        [JsonPropertyName("archivos")]
        public Archivo[] Archivos { get; set; }
        [JsonPropertyName("categorias")]
        public string[] Categorias { get; set; }
        [JsonPropertyName("estado")]
        public int Estado { get; set; }

        public Comercio()
        {

        }
    }
}