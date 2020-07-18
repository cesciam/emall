using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.CRUD;
using Entities;

namespace AppCore
{
    public class ImpuestoManagement
    {

        private ImpuestoCrudFactory crudImpuesto;

        public ImpuestoManagement()
        {
            crudImpuesto = new ImpuestoCrudFactory();

        }

        public void Create(Impuesto impuesto)
        {
            crudImpuesto.Create(impuesto);
        }

        public List<Impuesto> RetrieveAll()
        {
            return crudImpuesto.RetrieveAll<Impuesto>();
        }

        public Impuesto RetrieveById(Impuesto impuesto)
        {
            return crudImpuesto.Retrieve<Impuesto>(impuesto);
        }

        public void Update(Impuesto impuesto)
        {
            crudImpuesto.Update(impuesto);
        }

        public void Delete(Impuesto impuesto)
        {
            crudImpuesto.Delete(impuesto);
        }
    }
}
