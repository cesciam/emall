using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Categoria :BaseEntity
    {
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        [JsonPropertyName("Nombre")]
        public string Nombre { get; set; }

        public Categoria()
        {

        }

        public Categoria(string[] infoArray)
        {
            Nombre = infoArray[0];
        }
    }
}
