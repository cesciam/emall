using System;
using System.Collections.Generic;
using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.Crud {
    public class CalificacionCrudFactory : CrudFactory {
        CalificacionMapper mapper;

        public CalificacionCrudFactory() : base() {
            this.mapper = new CalificacionMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity) {
            var calificacion = (Calificacion)entity;
            var sqlOperation = mapper.GetCreateStatement(calificacion);

            dao.ExecuteProcedureAndReturnId(sqlOperation);
        }

        public T RetrieveByItem<T>(BaseEntity entity) {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveItemStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public T RetrieveByComercio<T>(BaseEntity entity) {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveComercioStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>() {
            var lstCalificaciones = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstCalificaciones.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstCalificaciones;
        }

        public override void Update(BaseEntity entity) {
            var calificacion = (Calificacion)entity;

            dao.ExecuteProcedure(mapper.GetUpdateStatement(calificacion));
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

        public override void Delete(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
