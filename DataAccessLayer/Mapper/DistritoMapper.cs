using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper {
    class DistritoMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_CODIGO = "codigo";
        private const string DB_COL_NOMBRE = "nombre";
        private const string DB_COL_ID_PROVINCIA = "codigoProvincia";
        private const string DB_COL_ID_CANTON = "codigoCanton";

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var distrito = new Distrito {
                Codigo = GetIntValue(row, DB_COL_CODIGO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                ProvinciaId = GetIntValue(row, DB_COL_ID_PROVINCIA),
                CantonId = GetIntValue(row, DB_COL_ID_CANTON)
            };

            return distrito;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var distrito = BuildObject(row);
                lstResults.Add(distrito);
            }

            return lstResults;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_DISTRITO" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_DISTRITO" };
            var d = (Distrito)entity;

            operation.AddIntParam(DB_COL_CODIGO, d.Codigo);

            return operation;
        }

        public SqlOperation GetRetriveByProvinciaCantonStatement(int provincia, int canton) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_DISTRITO_CANTON" };

            operation.AddIntParam(DB_COL_ID_PROVINCIA, provincia);
            operation.AddIntParam(DB_COL_ID_CANTON, canton);

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
