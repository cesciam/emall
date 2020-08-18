using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public class CitaViewModel
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public DateTime hora_inicio { get; set; }
        public DateTime hora_fin { get; set; }
        public string nombre_sucursal { get; set; }
        public int id_sucursal { get; set; }
        public string nombre_comercio { get; set; }
        public int id_comercio { get; set; }
        public string nombre_empleado { get; set; }
        public int id_empleado { get; set; }
    }
}
