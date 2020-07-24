using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class RolManagement
    {
        private RolCrudFactory crud;
        public RolManagement()
        {
            crud = new RolCrudFactory();
        }
        public void Create(Rol rol)
        {
            crud.Create(rol);
        }
        public List<Rol> RetrieveAll()
        {
            return crud.RetrieveAll<Rol>();
        }
        public Rol RetrieveById(Rol rol)
        {
            return crud.Retrieve<Rol>(rol);
        }
        public void Update(Rol rol)
        {
            crud.Update(rol);
        }
        public void Delete(Rol rol)
        {
            crud.Delete(rol);
        }
    }
}
