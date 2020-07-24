using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.ViewModels {
    public class RegistroViewModel {
        [Required]
        public string Cedula { get; set; }
        
        [Required]
        public string Nombre { get; set; }
        
        [Required]
        public string Apellido { get; set; }
        
        [Required]
        public string Correo { get; set; }

        [Required]
        public string Contrasena { get; set; }

        [Required]
        public string Telefono { get; set; }
        
        [Required]
        public int Tipo { get; set; }
    }
}
