using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Crud
{
    public class EmpleadoXItemCrudFactory : CrudFactory
    {
        EmpleadoXItemMapper mapper;

        public EmpleadoXItemCrudFactory() : base()
        {
            
            mapper = new EmpleadoXItemMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var empleado = (EmpleadosXItem)entity;
            var sqlOperation = mapper.GetCreateStatement(empleado);
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
            var item = (Item)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(item));
        }


        public override void Delete(BaseEntity entity)
        {
            var item = (Item)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(item));
        }

        public List<T> RetrieveAllByItem<T>(int id_item)
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByItem(id_item));
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