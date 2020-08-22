using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;


namespace AppCore
{
    public class PromocionManagement
    {
        private PromocionCrudFactory crud;

        public PromocionManagement()
        {
            crud = new PromocionCrudFactory();
        }

        public void Create(BaseEntity entity)
        {
            crud.Create(entity);
        }

        public Promocion Retrieve(BaseEntity entity)
        {
            return crud.Retrieve<Promocion>(entity);
        }

        public Promocion RetrieveByCodigo(BaseEntity entity)
        {
            return crud.RetrieveByCodigo<Promocion>(entity);
        }

        public List<Promocion> RetrieveAll()
        {
            return crud.RetrieveAll<Promocion>();
        }

        public List<Promocion> RetrieveAllByComercio(BaseEntity entity)
        {
            return crud.RetrieveAllByComercio<Promocion>(entity);
        }

        public List<Promocion> RetrieveAllBySucursal(BaseEntity entity)
        {
            return crud.RetrieveAllBySucursal<Promocion>(entity);
        }

        public List<Promocion> RetrieveAllByApp()
        {
            return crud.RetrieveAllByApp<Promocion>();
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
