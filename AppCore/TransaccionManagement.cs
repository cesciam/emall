using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class TransaccionManagement
    {
        private TransaccionCrudFactory transaccionCrudFactory;

        public TransaccionManagement()
        {
            this.transaccionCrudFactory = new TransaccionCrudFactory();
        }

        public int Create(Transaccion transaccion)
        {
            return this.transaccionCrudFactory.CreateAndReturnId(transaccion);
        }
    }
}
