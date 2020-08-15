using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper {
    class CantonMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_CODIGO = "codigo";
        private const string DB_COL_NOMBRE = "nombre";
        private const string DB_COL_ID_PROVINCIA = "codigoProvincia";

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var canton = new Canton {
                Codigo = GetIntValue(row, DB_COL_CODIGO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                ProvinciaId = GetIntValue(row, DB_COL_ID_PROVINCIA)
            };

            return canton;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var canton = BuildObject(row);
                lstResults.Add(canton);
            }

            return lstResults;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_CANTON" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CANTON" };
            var c = (Canton)entity;

            operation.AddIntParam(DB_COL_CODIGO, c.Codigo);

            return operation;
        }

        public SqlOperation GetRetriveByProvinciaStatement(int provincia) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CANTON_PROVINCIA" };

            operation.AddIntParam(DB_COL_ID_PROVINCIA, provincia);

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
