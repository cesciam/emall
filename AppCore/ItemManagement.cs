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

        public void CreateItem(Item item, string fotoUrl)
        {

            var archivo = crudItem.RetrieveFotoItem<Archivo>(fotoUrl);
            item.id_foto = archivo.Id;
            crudItem.Create(item);

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
            crudItem.Update(item);
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



    }
}
