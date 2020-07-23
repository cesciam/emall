using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Reflection;

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

        public List<Usuario> RetrieveSome(Dictionary<string, string> filters) {
            Usuario usuario = new Usuario();

            foreach (KeyValuePair<string, string> filter in filters) {
                PropertyInfo userProperty = usuario.GetType().GetProperty(filter.Key, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                if (userProperty != null) {
                    userProperty.SetValue(usuario, filter.Value);
                }
            }

            List<Usuario> usuarios = crudUsuario.RetrieveSome<Usuario>(usuario);

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
