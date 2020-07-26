using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Contrasena : BaseEntity {
        public int Id { get; set; }
        public string Clave { get; set; }
        public DateTime Fecha { get; set; }
        public int IdUsuario { get; set; }
    }
}
