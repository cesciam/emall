using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public class EnvioListViewModel
    {
        public int id { get; set; }
        public int id_cliente { get; set; }
        public string nombre_cliente { get; set; }
        public string latitud { get; set; }
        public string longitud { get; set; }
        public int id_empleado { get; set; }
        public string nombre_empleado { get; set; }
        public string codigo { get; set; }
        public int estado { get; set; }
    }
}
