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
        private ItemManagement itemManagement;
        private ContrasenaCrudFactory crudContrasena;
        private ErrorResultViewModel errorResult;
        private EmailService emailService;

        public UsuarioManagement() {
            this.crudUsuario = new UsuarioCrudFactory();
            this.itemManagement = new ItemManagement();
            this.crudContrasena = new ContrasenaCrudFactory();
            this.errorResult = new ErrorResultViewModel();
            this.emailService = new EmailService();
        }

        public int Registrar(RegistroViewModel registro, bool saltarValidacion = false) {
            if (!saltarValidacion) {
                var errores = this.ComprobarErrores(registro);

                if (errores != null)
                    return 0;
            }

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
                string empleadoMensaje = "";

                if (registro.Tipo == 4) {
                    empleadoMensaje = "<p>Ingresa con los siguientes datos: </p>";
                    empleadoMensaje += "Correo: " + registro.Correo + "<br>";
                    empleadoMensaje += "Contrasena: " + registro.Contrasena + "<br>";
                }

                this.CrearContrasena(registro.Contrasena, nuevoUsuarioId);

                //var url = "http://[host]"; //HttpContext.Request.Host.Value;
                //Envia email de activacion de cuenta
                this.emailService.Send(new EmailModel {
                    To = nuevoUsuario.Correo,
                    Subject = "Activa tu cuenta en Emall",
                    Message = "<p>Activa tu cuenta con el codigo: <strong>" + nuevoUsuario.CodigoCorreo + "</strong></p>" + empleadoMensaje
                });
            } else {
                this.errorResult.message = "Error general al registrar el usuario. Vuelva a intertarlo en unos minutos.";
            }

            return nuevoUsuarioId;
        }

        public Usuario Login(string correo, string contrasena) {
            Usuario usuario = this.crudUsuario.Login(correo.Trim(), contrasena.Trim());

            if (usuario != null) {
                Archivo archivo = new Archivo() {
                    Id = usuario.Foto.Id
                };

                usuario.Foto = this.itemManagement.RetrieveItemArchivo(archivo);
            }

            return usuario;
        }

        public bool RestablecerContraseña(string correo) {
            Usuario usuario = this.RetrieveByEmail(correo);

            if (usuario != null) {
                string nuevaContrasena = Utils.TokenGenerator.Generar(8);
                this.CrearContrasena(nuevaContrasena, usuario.Id);

                this.emailService.Send(new EmailModel {
                    To = usuario.Correo,
                    Subject = "Restablecer tu contraseña",
                    Message = "<p>Tu contraseña ha sido reestablecida, ingresa en el sitio con la siguiente contraseña:</p>" +
                              "<p>" + nuevaContrasena + "</p>"
                });

                return true;
            } else {
                return false;
            }
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
            Usuario usuarioActualizado = crudUsuario.Retrieve<Usuario>(usuario);
            Archivo archivo = new Archivo() { 
                Id = usuarioActualizado.Foto.Id
            };

            usuarioActualizado.Foto = this.itemManagement.RetrieveItemArchivo(archivo);

            return usuarioActualizado;
        }

        public Usuario RetrieveByEmail(string correo) {
            Usuario usuario = crudUsuario.RetrieveByCorreo<Usuario>(correo);

            if (usuario != null) {
                Archivo archivo = new Archivo() {
                    Id = usuario.Foto.Id
                };

                usuario.Foto = this.itemManagement.RetrieveItemArchivo(archivo);
            }

            return usuario;
        }

        public void Update(Usuario usuario) {
            crudUsuario.Update(usuario);

            if (!String.IsNullOrEmpty(usuario.Contrasena))
                this.CrearContrasena(usuario.Contrasena, usuario.Id);
        }

        public void Delete(int Id) {
            Usuario usuario = new Usuario();
            usuario.Id = Id;

            crudUsuario.Delete(usuario);
        }
    }
}
