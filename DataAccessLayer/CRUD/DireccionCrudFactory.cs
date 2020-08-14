using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.CRUD {
    public class DireccionCrudFactory : CrudFactory {
        DireccionMapper mapper;

        public DireccionCrudFactory() {
            mapper = new DireccionMapper();
            dao = SqlDao.GetInstance();

        }
        public int Registrar(BaseEntity entity) {
            var direccion = (Direccion)entity;
            var sqlOperation = mapper.GetCreateStatement(direccion);
            
            return (int)dao.ExecuteProcedureAndReturnId(sqlOperation);
        }

        public override void Delete(BaseEntity entity) {
            var direccion = (Direccion)entity;
            var sqlOperation = mapper.GetDeleteStatement(direccion);

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
        public List<T> RetrieveByUsuario<T>(int usuarioId) {
            var lstDireccion = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByUsuarioStatement(usuarioId));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstDireccion.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstDireccion;
        }

        public override List<T> RetrieveAll<T>() {
            var lstDireccion = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            
            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);
                
                foreach (var c in objs) {
                    lstDireccion.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstDireccion;
        }

        public override void Update(BaseEntity entity) {
            var direccion = (Direccion)entity;
            var sqlOperation = mapper.GetUpdateStatement(direccion);

            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Create(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
