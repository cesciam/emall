using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Security;

namespace AppCore
{
    public class ItemManagement
    {
        private ItemCrudFactory crudItem;
        private EmpleadoXItemCrudFactory crudEmpleadoXItem;

        public ItemManagement()
        {
            crudItem = new ItemCrudFactory();
            crudEmpleadoXItem = new EmpleadoXItemCrudFactory();
        }

        public Boolean validarItem(Item item)
        {
            Boolean status = true;
            if (item.tipo.Equals("Producto"))
            {
                if(item.precio<=0 || item.inventario <= 0)
                {
                    status = false;
                } 
            }
            else if (item.precio <= 0 || item.duracion <= 0)
            {
                status = false;
            }

            return status;
        }

        public void CreateItem(Item item)
        {

            if (validarItem(item))
            {
                if (item.tipo.Equals("Producto"))
                {
                    item.duracion = 0;
                }
                crudItem.Create(item);
            } else
            {
                throw new Exception("Valores numericos deben ser positivos");
            }
        }

        public void AsociarItemEmpleado(EmpleadosXItem tmp_empleado)
        {

            for(int i = 0; i < tmp_empleado.empleados.Length; i++)
            {
                var asociar = new EmpleadosXItem();
                asociar.id_item = tmp_empleado.id_item;
                asociar.id_empleado = tmp_empleado.empleados[i];
                crudEmpleadoXItem.Create(asociar);
                System.Threading.Thread.Sleep(1000);
            }


            
        }

        public List<Item> RetrieveAllItem()
        {
            return crudItem.RetrieveAll<Item>();
        }
        
        public Item RetrieveByIdItem(Item item)
        {
            return crudItem.Retrieve<Item>(item);
        }

        public void UpdateItem(Item item)
        {
            if (validarItem(item))
            {
                if (item.tipo.Equals("Producto"))
                {
                    item.duracion = 0;
                }
                crudItem.Update(item);
            }
            else
            {
                throw new Exception("Valores numericos deben ser positivos");
            }
        }

        public void UpdateArchivo(Archivo archivo)
        {
            crudItem.UpdateArchivo(archivo);
        }

        public void DeleteItem(Item item)
        {
            crudItem.Delete(item);
        }

        public List<Item> RetrieveAllBySucursal(int id_sucursal)
        {
            return crudItem.RetrieveAllBySucursal<Item>(id_sucursal);
        }

        public List<Item> RetrieveAllByTipo(string tipo)
        {
            return crudItem.RetrieveAllByTipo<Item>(tipo);
        }

        public Archivo RetrieveItemArchivo(Archivo archivo)
        {
            return crudItem.RetrieveItemArchivo<Archivo>(archivo);
        }

        public List<Item> ItemBusqueda(string busqueda)
        {
            return crudItem.ItemBusqueda<Item>(busqueda);
        }

        public Impuesto ImpuestoItem(Impuesto impuesto)
        {
            return crudItem.ImpuestoItem<Impuesto>(impuesto);
        }

        public List<EmpleadosXItem> obtenerEmpleadosItem(int id_item)
        {
            return crudEmpleadoXItem.RetrieveAllByItem<EmpleadosXItem>(id_item);
        }

    }
}
