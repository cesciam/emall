using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class EnvioManagement
    {
        EnvioCrudFactory envioCrudFactory;

        public EnvioManagement()
        {
            this.envioCrudFactory = new EnvioCrudFactory();
        }

        public void Create(Envio envio)
        {
            this.envioCrudFactory.Create(envio);
        }
    }
}
