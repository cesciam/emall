using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class CitaManagement
    {
        private CitaCrudFactory crud;
        private CitaManagement()
        {
            crud = new CitaCrudFactory();
        }

        public void Create(BaseEntity entity)
        {



            crud.Create(entity);
        }


        public Cita Retrieve(BaseEntity entity)
        {
            return crud.Retrieve<Cita>(entity);
        }

        public List<Configuracion> RetrieveAll()
        {
            return crud.RetrieveAll<Configuracion>();
        }

        public void Delete(BaseEntity entity)
        {
            crud.Delete(entity);
        }

        public void Update(BaseEntity entity)
        {
            crud.Update(entity);
        }
    }
}
