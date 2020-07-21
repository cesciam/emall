using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Promocion: BaseEntity
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public decimal porcentaje { get; set; }
        public string codigo { get; set; }
        public int cantidad { get; set; }
        public int id_comercio { get; set; }
        public int id_sucursal { get; set; }

    }
}
