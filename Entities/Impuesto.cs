using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Impuesto :BaseEntity
    {
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        [JsonPropertyName("Nombre")]

        public string Nombre { get; set;  }

        [JsonPropertyName("Porcentaje")]
        public Double Porcentaje { get; set; }

        public Impuesto()
        {

        }

        public Impuesto(string[] infoArray)
        {
            var montoImp = 0.0; 
            if (infoArray != null && infoArray.Length >= 1)
            {
                Nombre = infoArray[0];
                if (Double.TryParse(infoArray[1], out montoImp))

                    Porcentaje = montoImp;
                else
                    throw new Exception("El porcentaje debe ser un numero ");
            }
           

        }
    }
}
