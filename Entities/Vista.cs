using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Vista : BaseEntity
    {

        public int id { get; set; }
        public string nombre { get; set; }
        public Vista()
        {

        }
        public Vista(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 2)
            {
                var inputId = 0;
                if (int.TryParse(infoArray[0], out inputId))
                {
                    inputId = id;
                }
                else
                {
                    throw new Exception("La id no es válida");
                }
                nombre = infoArray[1];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
