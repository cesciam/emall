using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Usuario : BaseEntity {
        public int Id { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public int Foto { get; set; }
        public string Telefono { get; set; }
        public int TelefonoConfirmado { get; set; }
        public int CorreoConfirmado { get; set; }
        public string CodigoCorreo { get; set; }
        public string CodigoTelefono { get; set; }
        public int Estado { get; set; }

        public Usuario() {
        }
    }
}
