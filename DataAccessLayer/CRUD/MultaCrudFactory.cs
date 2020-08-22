using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Crud
{
    public class MultaCrudFactory : CrudFactory
    {
        MultaMapper mapper;

        public MultaCrudFactory() : base()
        {

            mapper = new MultaMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var multa = (Multa)entity;
            var sqlOperation = mapper.GetCreateStatement(multa);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lista = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lista.Count > 0)
            {
                dic = lista[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }
            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (resultados.Count > 0)
            {
                var objs = mapper.BuildObjects(resultados);

                foreach (var c in objs)
                {
                    lista.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lista;
        }

        public override void Update(BaseEntity entity)
        {
            var lista = (Multa)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(lista));
        }


        public override void Delete(BaseEntity entity)
        {
            var lista = (Multa)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(lista));
        }

        public List<T> RetrieveAllByUser<T>(int id_usuario)
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByUser(id_usuario));
            var dic = new Dictionary<string, object>();
            if (resultados.Count > 0)
            {
                var objs = mapper.BuildObjects(resultados);
                foreach (var c in objs)
                {
                    lista.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lista;
        }

    }
}