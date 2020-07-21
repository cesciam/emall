using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore {
    public class AuthManagement {
        private UsuarioCrudFactory crudUsuario;

        public AuthManagement() {
            this.crudUsuario = new UsuarioCrudFactory();
        }

        public bool RegistrarCuenta() {
            return false;
        }

        public Usuario Login(string correo, string contrasena) {
            return this.crudUsuario.Login(correo.Trim(), contrasena.Trim());
        }

        public bool Logout(Usuario usuario) { 
            return false;
        }

        public bool ConfirmarCuenta(Usuario usuario, string codigo) {
            return true;
        }
    }
}
