using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Empleado : BaseEntity
    {
        public int id { get; set; }
        public int id_usuario { get; set; }
        public int id_rol { get; set; }
        public int id_sucursal { get; set; }

        public Empleado()
        {

        }

        public Empleado(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 8)
            {
                var inputId = 0;
                if (Int32.TryParse(infoArray[0], out inputId))
                    inputId = id;
                else
                {
                    throw new Exception("La id no es válida");
                }
                var inputId_usuario = 0;
                if (Int32.TryParse(infoArray[1], out inputId_usuario))
                    inputId_usuario = id_usuario;
                else
                {
                    throw new Exception("La id del usuario no es válida");
                }
                var inputId_rol = 0;
                if (Int32.TryParse(infoArray[0], out inputId_rol))
                    inputId_rol = id_rol;
                else
                {
                    throw new Exception("La id del rol no es válida");
                }
                var inputId_sucursal = 0;
                if (Int32.TryParse(infoArray[0], out inputId_sucursal))
                    inputId_sucursal = id_sucursal;
                else
                {
                    throw new Exception("La id de la sucursal no es válida");
                }

            }
            else
            {
                throw new Exception("Todos los campos son requeridos");
            }
        }

    }
}
