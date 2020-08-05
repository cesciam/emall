using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public class HorarioViewModel
    {
        public int id { get; set; }
        public string fecha { get; set; }
        public string hora_inicio { get; set; }
        public string hora_fin { get; set; }
        public int id_usuario { get; set; }

    }
}
