using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class HorarioManagement
    {
        private HorarioCrudFactory crud;
        public HorarioManagement()
        {
            crud = new HorarioCrudFactory();
        }
        public void Create(Horario h)
        {
            crud.Create(h);
        }
        public List<Horario> RetrieveAll()
        {
            return crud.RetrieveAll<Horario>();
        }
        public Horario RetrieveById(Horario h)
        {
            return crud.Retrieve<Horario>(h);
        }
        public void Update(Horario h)
        {
            crud.Update(h);
        }
        public void Delete(Horario h)
        {
            crud.Delete(h);
        }
    }
}
