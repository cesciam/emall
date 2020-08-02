using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class EmpleadoManagement
    {
        private EmpleadoCrudFactory crud;

        public EmpleadoManagement()
        {
            crud = new EmpleadoCrudFactory();
        }
        public void Create(Empleado e)
        {
            crud.Create(e);
        }
        public List<Empleado> RetrieveAll()
        {
            return crud.RetrieveAll<Empleado>();
        }

        public List<EmpleadoViewModel> RetrieveByComercioId(int comercio) {
            return crud.RetrieveAllDatosByComercioId<EmpleadoViewModel>(comercio);
        }

        public List<Empleado> RetrieveAllDatos()
        {
            return crud.RetrieveAllDatos<Empleado>();
        }

        public Empleado RetrieveById(Empleado e)
        {
            return crud.Retrieve<Empleado>(e);
        }
        public void Update(Empleado e)
        {
            crud.Update(e);
        }
        public void Delete(Empleado e)
        {
            crud.Delete(e);
        }
    }
}
