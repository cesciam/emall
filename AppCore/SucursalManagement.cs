using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class SucursalManagement
    {
        private SucursalCrudFactory sucursalFactory;

        public SucursalManagement()
        {
            sucursalFactory = new SucursalCrudFactory();
        }

        public void CrearSucursal(Sucursal sucursal)
        {
            sucursalFactory.Create(sucursal);
        }

        public List<Sucursal> ObtenerTodoSucursal(Sucursal sucursal)
        {
            return sucursalFactory.RetrieveAll<Sucursal>(sucursal);
        }

        public Sucursal ObtenerSucursal(Sucursal sucursal)
        {
            return sucursalFactory.Retrieve<Sucursal>(sucursal);
        }

        public void ModificarSucursal(Sucursal sucursal)
        {
            sucursalFactory.Update(sucursal);
        }

        public void EliminarSucursal(Sucursal sucursal)
        {
            sucursalFactory.Delete(sucursal);
        }
    }
}
