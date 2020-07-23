using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class VistaXRol: BaseEntity
    {
        public int id { get; set; }
        public int id_vista { get; set; }
        public int id_rol { get; set; }
        public VistaXRol()
        {

        }
        public VistaXRol(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                var input_id = 0;
                if (Int32.TryParse(infoArray[0], out input_id))
                    id = input_id;
                else
                {
                    throw new Exception("La id no es válida");
                }
                var input_id_vista = 0;
                if (Int32.TryParse(infoArray[0], out input_id_vista))
                    id_vista = input_id_vista;
                else
                {
                    throw new Exception("La id de la vista no es válida");
                }
                var input_id_rol = 0;
                if (Int32.TryParse(infoArray[0], out input_id_rol))
                    id_rol = input_id_rol;
                else
                {
                    throw new Exception("La id del rol no es válida");
                }
            }
            else
            {
                throw new Exception("Todos los campos son requeridos");
            }
        }
    }
}
