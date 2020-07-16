using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper
{
    public class ImpuestoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_MONTO = "MONTO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var impuesto = new Impuesto() { 
                Id = GetIntValue(row,DB_COL_ID), 
                Nombre = GetStringValue(row,DB_COL_NOMBRE), 
                Monto = GetDoubleValue(row, DB_COL_MONTO)
            };

            return impuesto;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {

            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var impuesto = BuildObject(row);
                lstResults.Add(impuesto);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_MONTO, i.Monto);

            return operation; 
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_IMPUESTO_PR" };

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_MONTO, i.Monto);

            return operation;
        }
    }
}
