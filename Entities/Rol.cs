using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Rol : BaseEntity
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int id_comercio { get; set; }
        public Rol()
        {

        }
        public Rol(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                var inputId = 0;
                if (Int32.TryParse(infoArray[0], out inputId))
                    id = inputId;
                else
                {
                    throw new Exception("La id no es válida");
                }
                nombre = infoArray[1];
                descripcion = infoArray[2];
                var inputId_comercio = 0;
                if (Int32.TryParse(infoArray[3], out inputId_comercio))
                    id_comercio = inputId_comercio;
                else
                {
                    throw new Exception("La id del comercio no es válida");
                }
            }
            else
            {
                throw new Exception("Todos los campos son requeridos");
            }
        }
    }
}
