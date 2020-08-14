using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Horario: BaseEntity
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public string tipo_horario { get; set; }
        public DateTime hora_inicio { get; set; }
        public DateTime hora_fin { get; set; }
        public int id_usuario { get; set; }
        public int id_sucursal { get; set; }
        public Horario()
        {

        }
        public Horario(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 6)
            {
                var input_id = 0;
                if (int.TryParse(infoArray[0], out input_id))
                {
                    id = input_id;
                }
                else
                {
                    throw new Exception("La id no es válida");
                }
                fecha = DateTime.Parse(infoArray[1]);
                tipo_horario = infoArray[2];
                hora_inicio = DateTime.Parse(infoArray[3]);
                hora_fin = DateTime.Parse(infoArray[4]);
                var input_id_usuario = 0;
                if (int.TryParse(infoArray[5], out input_id_usuario))
                {
                    id_usuario = input_id_usuario;
                }
                else
                {
                    throw new Exception("El id de usuario debe ser numérico");
                }
                var input_id_sucursal = 0;
                if (int.TryParse(infoArray[6], out input_id_sucursal))
                {
                    id_sucursal = input_id_sucursal;
                }
                else
                {
                    throw new Exception("El id de sucursal debe ser numérico");
                }
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
