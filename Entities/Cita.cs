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
        public int id_horario { get; set; }
    }
}
