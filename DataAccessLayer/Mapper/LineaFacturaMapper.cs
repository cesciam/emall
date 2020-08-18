using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
   public class LineaFacturaMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_NOMBRE_ITEM = "NOMBRE_ITEM";
        private const string DB_COL_CANTIDAD_ITEM = "CANTIDAD_ITEM";
        private const string DB_COL_PRECIO_ITEM = "PRECIO_ITEM";
        private const string DB_COL_IMPUESTO = "IMPUESTO";
        private const string DB_COL_ID_FACTURA = "ID_FACTURA";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var linea = new LineaFactura
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdItem = GetIntValue(row, DB_COL_ID_ITEM),
                NombreItem = GetStringValue(row, DB_COL_NOMBRE_ITEM),
                CantidadItem = GetIntValue(row, DB_COL_CANTIDAD_ITEM),
                PrecioItem = GetIntValue(row, DB_COL_PRECIO_ITEM),
                Impuesto = GetDoubleValue(row, DB_COL_IMPUESTO),
                IdFactura = GetIntValue(row, DB_COL_ID_FACTURA)
            };

            return linea;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var lineaFactura = BuildObject(row);
                lstResults.Add(lineaFactura);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_LINEA_FACTURA" };
            var lineaFactura = (LineaFactura)entity;

            operation.AddIntParam(DB_COL_ID_ITEM, lineaFactura.IdItem);
            operation.AddVarcharParam(DB_COL_NOMBRE_ITEM, lineaFactura.NombreItem);
            operation.AddIntParam(DB_COL_CANTIDAD_ITEM, lineaFactura.CantidadItem);
            operation.AddDoubleParam(DB_COL_PRECIO_ITEM, lineaFactura.PrecioItem);
            operation.AddDoubleParam(DB_COL_IMPUESTO, lineaFactura.Impuesto);
            operation.AddIntParam(DB_COL_ID_FACTURA, lineaFactura.IdFactura);

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
