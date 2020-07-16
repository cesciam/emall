using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Impuesto :BaseEntity
    {
        public int Id { get; set; }

        public string Nombre { get; set;  }

        public Double Monto { get; set; }

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

                    Monto = montoImp;
                else
                    throw new Exception("El monto debe ser un numero ");
            }
           

        }
    }
}
