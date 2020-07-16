using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class PromocionCrudFactory : CrudFactory
    {
        PromocionMapper mapper;

        public PromocionCrudFactory(): base()
        {
            mapper = new PromocionMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var sqlOperacion = mapper.GetCreateStatement(entity);
            dao.ExecuteProcedure(sqlOperacion);
        }

        public override void Delete(BaseEntity entity)
        {
            var sqlOperacion = mapper.GetDeleteStatement(entity);
            dao.ExecuteProcedure(sqlOperacion);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));

            var dic = new Dictionary<string, object>();
            if(lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstPromocion = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach( var p in objs)
                {
                    lstPromocion.Add((T)Convert.ChangeType(p, typeof(T)));
                }
            }
            return lstPromocion;
        }

        public List<T> RetrieveAllByComercio<T>(BaseEntity entity)
        {
            var lstPromocion = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByComercioStament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var p in objs)
                {
                    lstPromocion.Add((T)Convert.ChangeType(p, typeof(T)));
                }
            }
            return lstPromocion;
        }

        public List<T> RetrieveAllBySucursal<T>(BaseEntity entity)
        {
            var lstPromocion = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllBySucursalStament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var p in objs)
                {
                    lstPromocion.Add((T)Convert.ChangeType(p, typeof(T)));
                }
            }
            return lstPromocion;
        }

        public List<T> RetrieveAllByApp<T>()
        {
            var lstPromocion = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByAppStament());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var p in objs)
                {
                    lstPromocion.Add((T)Convert.ChangeType(p, typeof(T)));
                }
            }
            return lstPromocion;
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetUpdateStatement(entity));
        }
    }
}
