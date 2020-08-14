using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Direccion : BaseEntity {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int ProvinciaId { get; set; }
        public int CantonId { get; set; }
        public int DistritoId { get; set; }
        public string Alias { get; set; }
        public string Detalles { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
    }
}
