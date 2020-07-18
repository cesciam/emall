using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class VistaManagement
    {
        private VistaCrudFactory crud;
        public VistaManagement()
        {
            crud = new VistaCrudFactory();
        }
        public void Create(Vista v)
        {
            crud.Create(v);
        }
        public List<Vista> RetrieveAll()
        {
            return crud.RetrieveAll< Vista > ();
        }
        public Vista RetrieveById(Vista v)
        {
            return crud.Retrieve< Vista > (v);
        }
        public void Update(Vista v)
        {
            crud.Update(v);
        }
        public void Delete(Vista v)
        {
            crud.Delete(v);
        }
    }
}
