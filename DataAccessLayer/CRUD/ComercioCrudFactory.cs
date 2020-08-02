using DataAccessLayer.Crud;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var comercioResult = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveStatement(entity));
            var dictionaryList = new Dictionary<string, object>();

            if (comercioResult.Count > 0)
            {
                dictionaryList = comercioResult[0];
                var comercio = (Comercio)comercioMapper.BuildObject(dictionaryList);
                comercio.Categorias = GenerarCategorias(comercio.Id);
                comercio.Archivos = GenerarArchivos(comercio.Id);

                return (T)Convert.ChangeType(comercio, typeof(T));
            }
            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var comerciosList = new List<T>();
            var comerciosResult = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveAllStatement());
            if (comerciosResult.Count > 0)
            {
                var comercios = comercioMapper.BuildObjects(comerciosResult);
                foreach (var c in comercios)
                {
                    comerciosList.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            foreach(var c in comerciosList)
            {
                var comercio = (Comercio)Convert.ChangeType(c, typeof(Comercio));
                comercio.Categorias = GenerarCategorias(comercio.Id);
                comercio.Archivos = GenerarArchivos(comercio.Id);
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
        }

        public void UpdateState(BaseEntity entity)
        {
            dao.ExecuteProcedure(comercioMapper.GetUpdateStateStatement(entity));
        }

        public List<T> RetrieveAll<T>(BaseEntity entity)
        {
            var comerciosList = new List<T>();
            var comerciosResult = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveAllStatement(entity));
            if (comerciosResult.Count > 0)
            {
                var comercios = comercioMapper.BuildObjects(comerciosResult);
                foreach (var c in comercios)
                {
                    comerciosList.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            foreach (var c in comerciosList)
            {
                var comercio = (Comercio)Convert.ChangeType(c, typeof(Comercio));
                comercio.Categorias = GenerarCategorias(comercio.Id);
                comercio.Archivos = GenerarArchivos(comercio.Id);
            }

            return comerciosList;
        }

        public List<T> RetrieveAllPending<T>()
        {
            var comerciosList = new List<T>();
            var comerciosResult = dao.ExecuteQueryProcedure(comercioMapper.GetRetriveAllPendingStatement());
            if (comerciosResult.Count > 0)
            {
                var comercios = comercioMapper.BuildObjects(comerciosResult);
                foreach (var c in comercios)
                {
                    comerciosList.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            foreach (var c in comerciosList)
            {
                var comercio = (Comercio)Convert.ChangeType(c, typeof(Comercio));
                comercio.Categorias = GenerarCategorias(comercio.Id);
                comercio.Archivos = GenerarArchivos(comercio.Id);
            }

            return comerciosList;
        }

        public void CrearArchivo(BaseEntity entity)
        {
            var c = (Comercio)entity;
            dao.ExecuteProcedure(archivoMapper.GetCreateStatement(c.Archivos[0], c.CedulaJuridica));
        }

        public Archivo[] GenerarArchivos(int IdComercio)
        {
            var archivo = new Archivo { Id_Comercio = IdComercio };
            var archivosResult = dao.ExecuteQueryProcedure(archivoMapper.GetRetriveAllStatement(archivo));
            var archivoList = new List<Archivo>();
            if (archivosResult.Count > 0)
            {
                var archivos = archivoMapper.BuildObjects(archivosResult);
                foreach (var a in archivos)
                {
                    archivoList.Add((Archivo)a);
                }
            }

            return archivoList.ToArray();
        }

        public string[] GenerarCategorias(int IdComercio)
        {
            var categoriaList = new List<string>();
            var categoriaxComercio = new CategoriaxComercio { IdComercio = IdComercio };

            var categoriaResult = dao.ExecuteQueryProcedure(categoriaxComercioMapper.GetRetriveAllStatement(categoriaxComercio));
            if (categoriaResult.Count > 0)
            {
                categoriaList = categoriaxComercioMapper.BuildObjects(categoriaResult);
            }

            return categoriaList.ToArray();
        }
    }
}
