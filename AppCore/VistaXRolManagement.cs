using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class VistaXRolManagement
    {
        private VistaXRolCrudFactory crud;
        public VistaXRolManagement()
        {
            crud = new VistaXRolCrudFactory();
        }
        public void Create(VistaXRol vr)
        {
            crud.Create(vr);
        }
        public List<VistaXRol> RetrieveAll()
        {
            return crud.RetrieveAll<VistaXRol>();
        }
        public VistaXRol RetrieveById(VistaXRol vr)
        {
            return crud.Retrieve<VistaXRol>(vr);
        }
        public void Update(VistaXRol vr)
        {
            crud.Update(vr);
        }
        public void Delete(VistaXRol vr)
        {
            crud.Delete(vr);
        }

        public List<VistaXRol> RetrieveByRol(VistaXRol V)
        {
            return crud.RetrieveByRol<VistaXRol>(V);
        }
    }
}
