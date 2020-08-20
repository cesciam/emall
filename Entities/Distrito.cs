using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Distrito : BaseEntity {
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public int ProvinciaId { get; set; }
        public int CantonId { get; set; }
    }
}
