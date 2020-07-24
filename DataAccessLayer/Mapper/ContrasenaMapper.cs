using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper {
    public class ContrasenaMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CONTRASENA = "CONTRASENA";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";

        public SqlOperation GetCreateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "CREAR_CONTRASENA" };

            var c = (Contrasena)entity;
            operation.AddVarcharParam(DB_COL_CONTRASENA, c.Clave);
            operation.AddDateParam(DB_COL_FECHA, c.Fecha);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.IdUsuario);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CONTRASENA" };

            var c = (Contrasena)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement() {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var usuario = BuildObject(row);
                lstResults.Add(usuario);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var contrasena = new Contrasena {
                Id = GetIntValue(row, DB_COL_ID),
                Clave = GetStringValue(row, DB_COL_CONTRASENA),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                IdUsuario = GetIntValue(row, DB_COL_ID_USUARIO)
            };

            return contrasena;
        }
    }
}
