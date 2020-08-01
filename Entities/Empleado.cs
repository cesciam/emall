using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Empleado : BaseEntity {
        public int id { get; set; }
        public int id_usuario { get; set; }
        public int id_rol { get; set; }
        public int id_sucursal { get; set; }

        public Empleado() {
        }
    }
}
