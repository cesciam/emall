using System;
using System.Collections.Generic;
using System.Text;

namespace Entities {
    public class Calificacion : BaseEntity {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int Puntaje { get; set; }
        public int ComercioId { get; set; }
        public int ItemId { get; set; }
    }
}
