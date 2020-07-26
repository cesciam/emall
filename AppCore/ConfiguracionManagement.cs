using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class ConfiguracionManagement
    {
        private ConfiguracionCrudFactory crud;

        public ConfiguracionManagement()
        {
            crud = new ConfiguracionCrudFactory();
        }

        public void Create(BaseEntity entity)
        {
            crud.Create(entity);
        }

        public Configuracion Retrieve(BaseEntity entity)
        {
            return crud.Retrieve<Configuracion>(entity);
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
