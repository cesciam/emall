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
        private const string DB_COL_PORCENTAJE = "PORCENTAJE";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var impuesto = new Impuesto() { 
                Id = GetIntValue(row,DB_COL_ID), 
                Nombre = GetStringValue(row,DB_COL_NOMBRE), 
                Porcentaje = GetDecimalValue(row, DB_COL_PORCENTAJE)
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
            var operation = new SqlOperation { ProcedureName = "CREAR_IMPUESTO" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_PORCENTAJE, i.Porcentaje);

            return operation; 
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_IMPUESTO" };

            var i = (Impuesto)entity;
            operation.AddIntParam(DB_COL_ID, i.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_IMPUESTO" };

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_IMPUESTO" };

            var i = (Impuesto)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_IMPUESTO" };

            var i = (Impuesto)entity;
            operation.AddIntParam(DB_COL_ID, i.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_PORCENTAJE, i.Porcentaje);

            return operation;
        }
    }
}
