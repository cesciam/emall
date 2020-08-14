using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Bitacora :BaseEntity
    {
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        [JsonPropertyName("Fecha")]
        public DateTime Fecha { get; set;  }

        [JsonPropertyName("Accion")]
        public string Accion { get; set; }

        [JsonPropertyName("Usuario")]
        public int Usuario { get; set;  }

        public Bitacora()
        {

        }

        public Bitacora(string[] datos)
        {
            if (datos != null && datos.Length <= 3)
            {
                Id = Int32.Parse(datos[0]);
                Fecha = DateTime.Parse(datos[1]);
                Accion = datos[2];
                Usuario = Int32.Parse(datos[3]);
            }
            
        }
    }

    
}
