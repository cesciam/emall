using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Entities {
    public class LoginViewModel {
        [Required]
        public string Correo { get; set; }
        [Required]
        public string Contrasena { get; set; }
    }
}
