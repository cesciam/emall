using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class ReporteCrudFactory : CrudFactory
    {
        ReporteMapper mapper;

        public ReporteCrudFactory(): base()
        {
            mapper = new ReporteMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override void Delete(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public  List<T> RetrieveCategoriaPorComercio<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveCategoriaPorComercioStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveEmpleadoPorComercio<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveEmpleadoPorComercioStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveUusuarioPorTipo<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveUsuarioPorTipoStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveUusuarioPorEstado<T>()
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveUsuarioPorEstadoStatement());
            return crearLista<T>(lstResult);   
        }

        public List<T> crearLista<T>(List<Dictionary<string, object>> lstResult) 
        {
            var lstConfigs = new List<T>();
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveVentas<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveVentasStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveTransacciones<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveTransaccionesStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveCitas<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveCitasStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

        public List<T> RetrieveMetodosPago<T>()
        {
            var lstConfigs = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveMetodosPagoStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstConfigs.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstConfigs;
        }

    }
}
