using System;
using System.Collections.Generic;
using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.CRUD {
    public class ContrasenaCrudFactory : CrudFactory {
        ContrasenaMapper mapper;

        public ContrasenaCrudFactory() : base() {
            mapper = new ContrasenaMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity) {
            var contrasena = (Contrasena)entity;
            var sqlOperation = mapper.GetCreateStatement(contrasena);

            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity) {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>() {
            throw new NotImplementedException();
        }

        public List<T> RetrieveSome<T>(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public override void Delete(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
