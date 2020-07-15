using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace AppCore {
    public class UsuarioManagement {
        private UsuarioCrudFactory crudUsuario;

        public UsuarioManagement() {
            this.crudUsuario = new UsuarioCrudFactory();
        }

        public void Create(Usuario usuario) {
            crudUsuario.Create(usuario);
        }

        public List<Usuario> RetrieveAll() {
            List<Usuario> usuarios = crudUsuario.RetrieveAll<Usuario>();

            return usuarios;
        }

        public Usuario RetrieveById(Usuario usuario) {
            return crudUsuario.Retrieve<Usuario>(usuario);
        }

        public void Update(Usuario usuario) {
            crudUsuario.Update(usuario);
        }

        public void Delete(int Id) {
            Usuario usuario = new Usuario();
            usuario.Id = Id;

            crudUsuario.Delete(usuario);
        }
    }
}
