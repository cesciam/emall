using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class SucursalCrudFactory : CrudFactory
    {
        private SucursalMapper sucursalMaper;

        public SucursalCrudFactory()
        {
            sucursalMaper = new SucursalMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            dao.ExecuteProcedure(sucursalMaper.GetCreateStatement(entity));
        }

        public override void Delete(BaseEntity entity)
        {
            dao.ExecuteProcedure(sucursalMaper.GetDeleteStatement(entity));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(sucursalMaper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = sucursalMaper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public T RetrieveByEmpleado<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(sucursalMaper.GetRetriveByEmpleadoStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = sucursalMaper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public List<T> RetrieveAll<T>(BaseEntity entity)
        {
            var lstSucursales = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(sucursalMaper.GetRetriveAllStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = sucursalMaper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstSucursales.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstSucursales;
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(sucursalMaper.GetUpdateStatement(entity));
        }
    }
}
