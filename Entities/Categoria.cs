using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Categoria : BaseEntity
    {
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        [JsonPropertyName("Nombre")]
        public string Nombre { get; set; }
        
        //Variable utilizada solamente para el reporte de comercios por categoria
        public int cantidad { get; set; }


        public Categoria()
        {

        }

        public Categoria(string[] infoArray)
        {
            var id = 0;
            if (infoArray != null && infoArray.Length >= 1)
            {
                Nombre = infoArray[0];
                

                if (Int32.TryParse(infoArray[1], out id))

                    Id = id;
                else
                    throw new Exception("-----");
            }
        }
    }
}
