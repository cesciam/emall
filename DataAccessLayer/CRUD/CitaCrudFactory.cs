using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class CitaCrudFactory : CrudFactory
    {
        CitaMapper mapper;

        public CitaCrudFactory() : base()
        {
            mapper = new CitaMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var cita = (Cita)entity;
            var sqlOperation = mapper.GetCreateStatement(cita);
            dao.ExecuteProcedure(sqlOperation);
        }

        public  void CreateCitaServicio(BaseEntity entity)
        {
            var cita = (Cita)entity;
            var sqlOperation = mapper.GetCreateServiceStatement(cita);
            dao.ExecuteProcedure(sqlOperation);
        }

        public T CreateCitaProducto<T>(BaseEntity entity)
        {
            var cita = (Cita)entity;

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCreateProductStatement(entity));

            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = Convert.ToInt32(lstResult[0]["ID_CITA"]);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public void InsertItemCita(ItemXCita itemXCita)
        {
            var sqlOperation = mapper.GetInsertProductCitaStatement(itemXCita);

            dao.ExecuteProcedure(sqlOperation);
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
            var lstCita = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var p in objs)
                {
                    lstCita.Add((T)Convert.ChangeType(p, typeof(T)));
                }
            }
            return lstCita;
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetUpdateStatement(entity));
        }

        public T VerificarHorario<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCompareStatament(entity));

            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildValidacion(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public Boolean VerificarCita(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCompareCitaStatament(entity));

            if (lstResult.Count > 0)
            {
                return true;
            }

            return false;
        }

        public int ObtenerEmpleadoDisponible(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetEmpleadoDisponibleStatament(entity));
            
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var id_empleado = mapper.BuildIdEmpleado(dic);
                return id_empleado;
            }

            return -1;
        }
        

        public int ObtenerEmpleadoDisponibleProd(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetEmpleadoDisponibleProdStatament(entity));

            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var id_empleado = mapper.BuildIdEmpleado(dic);
                return id_empleado;
            }

            return -1;
        }

        public List<T> ObtenerCitasCliente<T>(BaseEntity entity)
        {
            var lstCita = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCitasClienteStatament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                foreach(var row in lstResult)
                {
                    var obj = mapper.BuildView(row);
                    lstCita.Add((T)Convert.ChangeType(obj, typeof(T)));
                }
            }
            return lstCita;
        }

        public List<T> ObtenerCitasEmpleado<T>(BaseEntity entity)
        {
            var lstCita = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCitasEmpleadoStatament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                foreach (var row in lstResult)
                {
                    var obj = mapper.BuildViewEmpleado(row);
                    lstCita.Add((T)Convert.ChangeType(obj, typeof(T)));
                }
            }
            return lstCita;
        }

        public List<T> ObtenerCitasComercio<T>(BaseEntity entity)
        {
            var lstCita = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCitasComercioStatament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                foreach (var row in lstResult)
                {
                    var obj = mapper.BuildViewComercio(row);
                    lstCita.Add((T)Convert.ChangeType(obj, typeof(T)));
                }
            }
            return lstCita;
        }

        public List<T> ObtenerCitasSucursal<T>(BaseEntity entity)
        {
            var lstCita = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetCitasSucursalStatament(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                foreach (var row in lstResult)
                {
                    var obj = mapper.BuildViewComercio(row);
                    lstCita.Add((T)Convert.ChangeType(obj, typeof(T)));
                }
            }
            return lstCita;
        }
    }
}
