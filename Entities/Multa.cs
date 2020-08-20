using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Multa : BaseEntity
    {
        public int id { get; set; }
        public int id_usuario { get; set; }
        public int id_item { get; set; }
        public int id_comercio { get; set; }
        public int id_sucursal { get; set; }
        public DateTime fecha { get; set; }
        public Usuario usuario { get; set; }
        public Item item { get; set; }
        public Comercio comercio { get; set; }
        public Sucursal sucursal { get; set; }

    }
}
