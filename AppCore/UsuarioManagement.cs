using DataAccessLayer.Crud;
using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;
using Utils;
using Utils.Email;
using Microsoft.Extensions.Configuration;

namespace AppCore {
    public class UsuarioManagement {
        private UsuarioCrudFactory crudUsuario;
        private ContrasenaCrudFactory crudContrasena;
        private ErrorResultViewModel errorResult;
        private EmailService emailService;

        public UsuarioManagement() {
            this.crudUsuario = new UsuarioCrudFactory();
            this.crudContrasena = new ContrasenaCrudFactory();
            this.errorResult = new ErrorResultViewModel();
            this.emailService = new EmailService();
        }

        public bool Registrar(RegistroViewModel registro) {
            var errores = this.ComprobarErrores(registro);

            if (errores != null)
                return false;

            Usuario nuevoUsuario = new Usuario {
                Id = 0,
                Cedula = registro.Cedula,
                Nombre = registro.Nombre,
                Apellido = registro.Apellido,
                Correo = registro.Correo,
                Telefono = registro.Telefono,
                Tipo = registro.Tipo,
                Estado = 0,
                Foto = registro.Foto,
                CorreoConfirmado = 0,
                TelefonoConfirmado = 0,
                CodigoTelefono = TokenGenerator.Generar(8),
                CodigoCorreo = TokenGenerator.Generar(8),
            };

            int nuevoUsuarioId = this.crudUsuario.Insert(nuevoUsuario);

            if (nuevoUsuarioId != 0) {
                this.CrearContrasena(registro.Contrasena, nuevoUsuarioId);

                var url = "http://[host]"; //HttpContext.Request.Host.Value;
                //Envia email de activacion de cuenta
                this.emailService.Send(new EmailModel {
                    To = nuevoUsuario.Correo,
                    Subject = "Activar cuenta",
                    Message = "<p>Activar cuenta con el codigo: <strong>" + nuevoUsuario.CodigoCorreo + "</strong></p>" +
                              "<p><a href=\"" + url + "\">Activar cuenta</a></p>"
                });

                return true;
            } else {
                this.errorResult.message = "Error general al registrar el usuario. Vuelva a intertarlo en unos minutos.";
                return false;
            }
        }

        public Usuario Login(string correo, string contrasena) {
            return this.crudUsuario.Login(correo.Trim(), contrasena.Trim());
        }

        public void CrearContrasena(string contrasena, int usuarioId) {
            Contrasena nuevaContrasena = new Contrasena {
                Id = 0,
                Clave = Utils.Md5.generateMD5Hash(contrasena),
                Fecha = DateTime.Now,
                IdUsuario = usuarioId
            };

            this.crudContrasena.Create(nuevaContrasena);
        }

        public ErrorResultViewModel ComprobarErrores(RegistroViewModel registro) {
            this.errorResult.details = new List<string>();

            if (!FormatValidation.IsValidEmail(registro.Correo))
                this.errorResult.details.Add("El email no tiene un formato valido");

            if (!FormatValidation.IsValidPassword(registro.Contrasena))
                this.errorResult.details.Add("La contraseña no tiene un formato valido");

            if (!FormatValidation.IsValidPhone(registro.Telefono))
                this.errorResult.details.Add("El telefono no tiene un formato valido");

            if (this.errorResult.details.Count == 0) {
                return null;
            } else {
                this.errorResult.message = "Han ocurrido errores al registrar el usuario";
                return this.errorResult;
            }
                
        }

        public bool Activar(int id, string codigo) {
            return this.crudUsuario.Activar(id, codigo);
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
