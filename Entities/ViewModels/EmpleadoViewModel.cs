using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels {
    public class EmpleadoViewModel {
		public int Id { get; set; }
		public int IdUsuario { get; set; }
		public string Cedula { get; set; }
		public string UsuarioNombre { get; set; }
		public string Apellido { get; set; }
		public string Correo { get; set; }
		public string Telefono { get; set; }
		public int IdRol { get; set; }
		public string RolNombre { get; set; }
		public int IdSucursal { get; set; }
		public string SucursalNombre { get; set; }
		public int IdComercio { get; set; }
		public string NombreComercio { get; set; }
	}
}