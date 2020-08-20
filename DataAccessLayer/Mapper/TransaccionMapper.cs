using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class TransaccionMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CODIGO_CONFIRMACION = "CODIGO_CONFIRMACION";
        private const string DB_COL_TIPO_PAGO = "TIPO_PAGO";
        private const string DB_COL_MONTO = "MONTO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var transaccion = new Transaccion
            {
                Id = GetIntValue(row, DB_COL_ID),
                CodigoTransaccion = GetStringValue(row, DB_COL_CODIGO_CONFIRMACION),
                TipoPago = GetStringValue(row, DB_COL_TIPO_PAGO),
                Monto = GetDecimalValue(row, DB_COL_MONTO)
            };

            return transaccion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var transaccion = BuildObject(row);
                lstResults.Add(transaccion);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_TRANSACCION" };
            var transaccion = (Transaccion)entity;

            operation.AddVarcharParam(DB_COL_CODIGO_CONFIRMACION, transaccion.CodigoTransaccion);
            operation.AddVarcharParam(DB_COL_TIPO_PAGO, transaccion.TipoPago);
            operation.AddDoubleParam(DB_COL_MONTO, transaccion.Monto);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
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
