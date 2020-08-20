using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class ListaDeseo : BaseEntity
    {
        public int id { get; set; }
        public int id_item { get; set; }
        public int id_usuario { get; set; }
        public Usuario usuario { get; set; }
        public List<Item> items { get; set; }
    }
}
