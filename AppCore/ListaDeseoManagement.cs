using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Security;

namespace AppCore
{
    public class ListaDeseoManagement
    {
        private ListaDeseoCrudFactory crudListaDeseo;
        private ItemCrudFactory crudItem;
        private UsuarioCrudFactory crudUsuario;

        public ListaDeseoManagement()
        {
            crudListaDeseo = new ListaDeseoCrudFactory();
            crudItem = new ItemCrudFactory();
            crudUsuario = new UsuarioCrudFactory();
        }



        public void CreateLista(ListaDeseo lista)
        {

            if(ObtenerLista(lista) == null)
            {
                crudListaDeseo.Create(lista);
            }
        }

        public ListaDeseo ObtenerLista(ListaDeseo lista)
        {
            return crudListaDeseo.Retrieve<ListaDeseo>(lista);
        }


        public ListaDeseo RetrieveListaUsuario(int id_usuario)
        {
            var registros = crudListaDeseo.RetrieveAllByUser<ListaDeseo>(id_usuario);

            var items = new List<Item>();
            var lista = new ListaDeseo();
            var user = new Usuario();

            for(int i = 0; i < registros.Count; i++)
            {
                var tmp_item = new Item();
                tmp_item.id = registros[i].id_item;
                tmp_item = crudItem.Retrieve<Item>(tmp_item);
                items.Add(tmp_item);
            }

            user.Id = id_usuario;
            user = crudUsuario.Retrieve<Usuario>(user);

            lista.items = items;
            lista.usuario = user;

            return lista;
            
        }

        public void DeleteLista(ListaDeseo lista)
        {
            crudListaDeseo.Delete(lista);
        }


    }
}
