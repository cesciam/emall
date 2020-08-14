using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.CRUD;
using Entities;

namespace AppCore
{ 
   public  class BitacoraManagement
    {
        private BitacoraCrudFactory crudBitacora;

        public BitacoraManagement()
        {
            crudBitacora = new BitacoraCrudFactory(); 
        }

        public void Create(Bitacora bitacora)
        {
            crudBitacora.Create(bitacora);
        }

        public List<Bitacora> RetrieveAll()
        {
            return crudBitacora.RetrieveAll<Bitacora>();
        }


    }
}
