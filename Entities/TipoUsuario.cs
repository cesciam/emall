using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class TipoUsuario : BaseEntity {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
