using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public class CitaComerModelView: BaseEntity
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public DateTime hora_inicio { get; set; }
        public DateTime hora_fin { get; set; }
        public string nombre_empleado { get; set; }
        public int id_empleado { get; set; }
        public string nombre_cliente { get; set; }
        public int id_cliente { get; set; }
    }
}
