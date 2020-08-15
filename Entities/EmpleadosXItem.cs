using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class EmpleadosXItem : BaseEntity
    {
        public int id { get; set; }
        public int id_item { get; set; }
        public int[] empleados { get; set; }
        public int id_empleado { get; set; }
    }
}
