using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Cita: BaseEntity
    {
        public int id { get; set;}
        public int id_item { get; set; }
        public int id_cliente { get; set; }
        public int id_empleado { get; set; }
        public DateTime fecha { get; set; }
        public DateTime hora_inicio { get; set; }
        public DateTime hora_fin { get; set; }
        public string codigo { get; set; }

        public int id_sucursal { get; set; }
        public int id_comercio { get; set; }
        public int[] items { get; set; }
    }
}
