using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using DataAccessLayer.CRUD;
using Entities;

namespace AppCore {
    public class DireccionManagement {
        private DireccionCrudFactory crudDireccion;
        private ProvinciaCrudFactory crudProvincia;
        private CantonCrudFactory crudCanton;
        private DistritoCrudFactory crudDistrito;

        public DireccionManagement() {
            this.crudDireccion = new DireccionCrudFactory();
            this.crudProvincia = new ProvinciaCrudFactory();
            this.crudCanton = new CantonCrudFactory();
            this.crudDistrito = new DistritoCrudFactory();
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

        public Direccion RetrieveActivaByUserId(int usuarioId)
        {
            return this.crudDireccion.RetrieveActivaByUsuario<Direccion>(usuarioId);
        }

        public void Update(Direccion Direccion) {
            this.crudDireccion.Update(Direccion);
        }

        public void Delete(Direccion Direccion) {
            this.crudDireccion.Delete(Direccion);
        }

        public List<Provincia> RetrieveProvincias() {
            return this.crudProvincia.RetrieveAll<Provincia>();
        }

        public List<Canton> RetrieveCantones(int provincia) {
            return this.crudCanton.RetrieveByProvincia<Canton>(provincia);
        }

        public List<Distrito> RetrieveDistritos(int provincia, int canton) {
            return this.crudDistrito.RetrieveByProvinciaCanton<Distrito>(provincia, canton);
        }

        public void MakeDefault(int id) {
            Direccion direccion = new Direccion() { 
                Id = id
            };

            Direccion direccionAEditar = this.RetrieveById(direccion);

            if (direccionAEditar != null) {
                this.crudDireccion.MakeDefault(id, direccionAEditar.UsuarioId);
            }
        }
    }
}
