using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class HorarioCrudFactory : CrudFactory
    {
        HorarioMapper mapper;
        public HorarioCrudFactory() : base()
        {
            mapper = new HorarioMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var h = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetCreateStatement(h));
        }

        public void CreateWithUser(BaseEntity entity)
        {
            var h = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetCreateStatementWithUser(h));
        }

        public override void Delete(BaseEntity entity)
        {
            var h = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(h));
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
            var lstHorarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstHorarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstHorarios;
        }

        public override void Update(BaseEntity entity)
        {
            var h = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(h));
        }
    }
}
