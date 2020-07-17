using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Item : BaseEntity
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public double precio { get; set; }
        public string tipo { get; set; }
        public int inventario { get; set; }
        public DateTime duracion { get; set; }
        public int id_sucursal { get; set; }
        public int id_impuesto { get; set; }
        public int id_foto { get; set; }
    }
}