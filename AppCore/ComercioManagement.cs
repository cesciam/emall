using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class ComercioManagement
    {
        private ComercioCrudFactory comercioFactory;

        public ComercioManagement()
        {
            comercioFactory = new ComercioCrudFactory();
        }
        public void CrearComercio(Comercio comercio)
        {
            comercioFactory.Create(comercio);
        }

        public List<Comercio> ObtenerTodoComercio()
        {
            return comercioFactory.RetrieveAll<Comercio>();
        }

        public Comercio ObtenerComercio(Comercio comercio)
        {
            return comercioFactory.Retrieve<Comercio>(comercio);
        }

        public void ModificarComercio(Comercio comercio)
        {
            comercioFactory.Update(comercio);
        }

        public void EliminarComercio(Comercio comercio)
        {
            comercioFactory.Delete(comercio);
        }

        public void ModificarEstadoComercio(Comercio comercio)
        {
            comercioFactory.UpdateState(comercio);
        }
    }
}
