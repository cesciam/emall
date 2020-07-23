using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class VistaCrudFactory : CrudFactory
    {
        VistaMapper mapper;
        public VistaCrudFactory() : base()
        {
            mapper = new VistaMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var vista = (Vista)entity;
            dao.ExecuteProcedure(mapper.GetCreateStatement(vista));
        }

        public override void Delete(BaseEntity entity)
        {
            var vista = (Vista)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(vista));
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
            var lstVistas = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstVistas.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstVistas;
        }

        public override void Update(BaseEntity entity)
        {
            var vista = (Vista)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(vista));
        }
    }
}
