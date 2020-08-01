using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class ReporteMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_CANTIDAD = "CANTIDAD";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var reporte = new Reporte
            {
                
                nombre = GetStringValue(row, DB_COL_NOMBRE),
                cantidad  = GetIntValue(row, DB_COL_CANTIDAD),
                
                
            };

            return reporte;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var reporte = BuildObject(row);
                lstResult.Add(reporte);
            }

            return lstResult;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }
        public SqlOperation GetRetrieveCategoriaPorComercioStatement()
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_REPORTE_CATEGORIA" };

            return operacion;
        }

        public SqlOperation GetRetrieveEmpleadoPorComercioStatement()
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_REPORTE_EMPLEADOS_COMERCIO" };

            return operacion;

        }


        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
