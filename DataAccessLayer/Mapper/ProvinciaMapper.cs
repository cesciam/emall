using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper {
    class ProvinciaMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_CODIGO = "codigo";
        private const string DB_COL_NOMBRE = "nombre";

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var provincia = new Provincia {
                Codigo = GetIntValue(row, DB_COL_CODIGO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE)
            };

            return provincia;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var provincia = BuildObject(row);
                lstResults.Add(provincia);
            }

            return lstResults;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_PROVINCIA" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_PROVINCIA" };
            var p = (Provincia)entity;

            operation.AddIntParam(DB_COL_CODIGO, p.Codigo);

            return operation;
        }

        SqlOperation ISqlStaments.GetCreateStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }

        SqlOperation ISqlStaments.GetDeleteStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }

        SqlOperation ISqlStaments.GetRetriveAllStatement() {
            throw new NotImplementedException();
        }

        SqlOperation ISqlStaments.GetRetriveStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }

        SqlOperation ISqlStaments.GetUpdateStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
