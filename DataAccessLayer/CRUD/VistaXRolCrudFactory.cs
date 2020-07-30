using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class VistaXRolCrudFactory : CrudFactory
    {
        public VistaXRolMapper mapper;
        public VistaXRolCrudFactory() : base()
        {
            mapper = new VistaXRolMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var vr = (VistaXRol)entity;
            dao.ExecuteProcedure(mapper.GetCreateStatement(vr));
        }

        public override void Delete(BaseEntity entity)
        {
            var vr = (VistaXRol)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(vr));
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

        public List<T> RetrieveByRol<T>(BaseEntity entity)
        {
            var lstVr = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByRol(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstVr.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstVr;
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstVr = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstVr.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstVr;
        }

        public override void Update(BaseEntity entity)
        {
            var vr = (VistaXRol)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(vr));
        }
    }
}
