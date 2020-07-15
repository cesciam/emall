using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Archivo : BaseEntity {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Enlace { get; set; }
        public int Tipo { get; set; }
        public int Id_Comercio { get; set; }

        public Archivo() { 
        }
    }
}
