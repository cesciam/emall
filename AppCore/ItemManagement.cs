using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace AppCore
{
    public class ItemManagement
    {
        private ItemCrudFactory crudItem;

        public ItemManagement()
        {
            crudItem = new ItemCrudFactory();
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
            else if (item.precio <= 0 || item.inventario <= 0 || item.duracion <= 0)
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


            




            //var archivo = crudItem.RetrieveFotoItem<Archivo>(fotoUrl);
            //item.id_foto = archivo.Id;
            //crudItem.Create(item);

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

    }
}
