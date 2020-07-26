using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.CRUD;
using Entities;

namespace AppCore
{
    public class CategoriaManagement
    {
        private CategoriaCrudFactory crudCategoria; 

        public CategoriaManagement()
        {
            crudCategoria = new CategoriaCrudFactory(); 
        }

        public void Create(Categoria categoria)
        {
            crudCategoria.Create(categoria);
        }

        public List<Categoria> RetrieveAll()
        {
            return crudCategoria.RetrieveAll<Categoria>();
        }

        public Categoria RetrieveById(Categoria categoria)
        {
            return crudCategoria.Retrieve<Categoria>(categoria);
        }

        public void Update(Categoria categoria)
        {
            crudCategoria.Update(categoria);
        }

        public void Delete(Categoria categoria)
        {
            crudCategoria.Delete(categoria);
        }
    }
}
