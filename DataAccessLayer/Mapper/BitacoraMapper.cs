using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;
using Twilio.Rest.Verify.V2.Service.Entity;

namespace DataAccessLayer.Mapper
{
    class BitacoraMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID"; 
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_ACCION = "ACCION";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";  
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var bitacora = new Bitacora()
            {
                Id =  GetIntValue(row, DB_COL_ID), 
                Fecha = GetDateValue(row, DB_COL_FECHA), 
                Accion =  GetStringValue(row, DB_COL_ACCION), 
                Usuario = GetIntValue(row, DB_COL_ID_USUARIO)
            };

            return bitacora; 
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var bitacora = BuildObject(row);
                lstResults.Add(bitacora);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_BITACORA" };

            var b = (Bitacora)entity;

            
            operation.AddDateParam(DB_COL_FECHA, b.Fecha);
            operation.AddVarcharParam(DB_COL_ACCION, b.Accion);
            operation.AddIntParam(DB_COL_ID_USUARIO, b.Usuario);

            return operation; 
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_BITACORA" };

            return operation;
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
