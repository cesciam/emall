using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class RolCrudFactory : CrudFactory
    {
        RolMapper mapper;
        public RolCrudFactory() : base()
        {
            mapper = new RolMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var r = (Rol)entity;
            dao.ExecuteProcedure(mapper.GetCreateStatement(r));
        }

        public override void Delete(BaseEntity entity)
        {
            var r = (Rol)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(r));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstRol = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstRol.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstRol;
        }

        public override void Update(BaseEntity entity)
        {
            var r = (Rol)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(r));
        }
    }
}
