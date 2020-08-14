using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.CRUD;
using Entities;

namespace AppCore {
    public class DireccionManagement {
        private DireccionCrudFactory crudDireccion;

        public DireccionManagement() {
            this.crudDireccion = new DireccionCrudFactory();
        }

        public int Registrar(Direccion Direccion) {
            return this.crudDireccion.Registrar(Direccion);
        }

        public List<Direccion> RetrieveAll() {
            return this.crudDireccion.RetrieveAll<Direccion>();
        }

        public Direccion RetrieveById(Direccion Direccion) {
            return this.crudDireccion.Retrieve<Direccion>(Direccion);
        }

        public List<Direccion> RetrieveByUserId(int usuarioId) {
            return this.crudDireccion.RetrieveByUsuario<Direccion>(usuarioId);
        }

        public void Update(Direccion Direccion) {
            this.crudDireccion.Update(Direccion);
        }

        public void Delete(Direccion Direccion) {
            this.crudDireccion.Delete(Direccion);
        }
    }
}
