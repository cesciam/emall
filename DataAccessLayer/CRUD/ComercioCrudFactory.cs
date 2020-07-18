using DataAccessLayer.Crud;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class ComercioCrudFactory : CrudFactory
    {
        private ComercioMapper comercioMapper;
        private ArchivoMapper archivoMapper;
        private CategoriaxComercioMapper categoriaxComercioMapper;

        public ComercioCrudFactory()
        {
            comercioMapper = new ComercioMapper();
            archivoMapper = new ArchivoMapper();
            categoriaxComercioMapper = new CategoriaxComercioMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            dao.ExecuteProcedure(comercioMapper.GetCreateStatement(entity));
            var c = (Comercio)entity;

            foreach(var a in c.Archivos)
            {
                dao.ExecuteProcedure(archivoMapper.GetCreateStatement(a, c.CedulaJuridica));
            }

            foreach(var ca in c.Categorias)
            {
                dao.ExecuteProcedure(categoriaxComercioMapper.GetCreateStatement(ca, c.CedulaJuridica));
            }
        }

        public override void Delete(BaseEntity entity)
        {
            dao.ExecuteProcedure(comercioMapper.GetDeleteStatement(entity));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var comercioList = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveStatement(entity));
            var dictionaryList = new Dictionary<string, object>();

            if (comercioList.Count > 0)
            {
                dictionaryList = comercioList[0];
                var objs = comercioMapper.BuildObject(dictionaryList);
                var comercio = (Comercio)Convert.ChangeType(objs, typeof(Comercio));
                var categoriaxComercio = new CategoriaxComercio { IdComercio = comercio.Id };

                var categoriasxComercioList = dao.ExecuteQueryProcedure(categoriaxComercioMapper.GetRetriveAllStatement(categoriaxComercio));
                if (categoriasxComercioList.Count > 0)
                {
                    var categorias = categoriaxComercioMapper.BuildObjects(categoriasxComercioList);
                    comercio.Categorias = categorias.ToArray();
                }
                return (T)Convert.ChangeType(comercio, typeof(T));
            }
            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var comerciosList = new List<T>();
            var result = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveAllStatement());
            if (result.Count > 0)
            {
                var comercios = comercioMapper.BuildObjects(result);
                foreach (var c in comercios)
                {
                    comerciosList.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            foreach(var c in comerciosList)
            {
                var comercio = (Comercio)Convert.ChangeType(c, typeof(Comercio));

                var categoriaxComercio = new CategoriaxComercio
                {
                    IdComercio = comercio.Id
                };

                var categoriasxComercioList = dao.ExecuteQueryProcedure(categoriaxComercioMapper.GetRetriveAllStatement(categoriaxComercio));
                if (categoriasxComercioList.Count > 0)
                {
                    var categorias = categoriaxComercioMapper.BuildObjects(categoriasxComercioList);
                    comercio.Categorias = categorias.ToArray();
                }
            }

            return comerciosList;
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(comercioMapper.GetUpdateStatement(entity));
            var c = (Comercio)entity;

            foreach (var a in c.Archivos)
            {
                dao.ExecuteProcedure(archivoMapper.GetUpdateStatement(a));
            }

            //TODO: Actualizar categorías del comercio
            /*foreach (var ca in c.Categorias)
            {
                dao.ExecuteProcedure(categoriaxComercioMapper.GetCreateStatement(ca, c.CedulaJuridica));
            }*/
        }
    }
}
