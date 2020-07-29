using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class EmpleadoCrudFactory : CrudFactory
    {
        EmpleadoMapper mapper;
        public EmpleadoCrudFactory(): base()
        {
            mapper = new EmpleadoMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            var sqlOperation = mapper.GetCreateStatement(empleado);
            dao.ExecuteProcedure(sqlOperation);
        }

        public List<T> RetrieveAllDatos<T>()
        {
            var lstEmpleados = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllDatosStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEmpleados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEmpleados;
        }

        public override void Delete(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            var sqlOperation = mapper.GetDeleteStatement(empleado);
            dao.ExecuteProcedure(sqlOperation);
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
            var lstEmpleados = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEmpleados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEmpleados;
        }

        public override void Update(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(empleado));
        }
    }
}
