using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper {
    class DireccionMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_ID = "ID";
        private const string DB_ID_USUARIO = "ID_USUARIO";
        private const string DB_ID_PROVINCIA = "ID_PROVINCIA";
        private const string DB_ID_CANTON = "ID_CANTON";
        private const string DB_ID_DISTRITO = "ID_DISTRITO";
        private const string DB_DETALLES = "DETALLES";
        private const string DB_LATITUD = "LATITUD";
        private const string DB_LONGITUD = "LONGITUD";
        private const string DB_ALIAS = "ALIAS";
        private const string DB_ACTIVA = "ACTIVA";

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var direccion = new Direccion {
                Id = GetIntValue(row, DB_COL_ID),
                UsuarioId = GetIntValue(row, DB_ID_USUARIO),
                ProvinciaId = GetIntValue(row, DB_ID_PROVINCIA),
                CantonId = GetIntValue(row, DB_ID_CANTON),
                DistritoId = GetIntValue(row, DB_ID_DISTRITO),
                Detalles = GetStringValue(row, DB_DETALLES),
                Latitud = GetStringValue(row, DB_LATITUD),
                Longitud = GetStringValue(row, DB_LONGITUD),
                Alias = GetStringValue(row, DB_ALIAS),
                Activa = GetIntValue(row, DB_ACTIVA),
            };

            return direccion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var direccion = BuildObject(row);
                lstResults.Add(direccion);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "CREAR_DIRECCION" };

            var d = (Direccion)entity;
            operation.AddIntParam(DB_ID_USUARIO, d.UsuarioId);
            operation.AddIntParam(DB_ID_PROVINCIA, d.ProvinciaId);
            operation.AddIntParam(DB_ID_CANTON, d.CantonId);
            operation.AddIntParam(DB_ID_DISTRITO, d.DistritoId);
            operation.AddVarcharParam(DB_DETALLES, d.Detalles);
            operation.AddVarcharParam(DB_LATITUD, d.Latitud);
            operation.AddVarcharParam(DB_LONGITUD, d.Longitud);
            operation.AddVarcharParam(DB_ALIAS, d.Alias);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_DIRECCION" };
            var d = (Direccion)entity;

            operation.AddIntParam(DB_COL_ID, d.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_DIRECCION" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_DIRECCION" };
            var d = (Direccion)entity;

            operation.AddIntParam(DB_COL_ID, d.Id);

            return operation;
        }

        public SqlOperation GetRetriveByUsuarioStatement(int usuarioId) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_DIRECCION_USUARIO" };

            operation.AddIntParam(DB_ID_USUARIO, usuarioId);

            return operation;
        }

        public SqlOperation MakeDefault(int id, int usuarioId) {
            var operation = new SqlOperation { ProcedureName = "PREDETERMINADA_DIRECCION" };

            operation.AddIntParam(DB_COL_ID, id);
            operation.AddIntParam(DB_ID_USUARIO, usuarioId);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_DIRECCION" };
            var d = (Direccion)entity;

            operation.AddIntParam(DB_COL_ID, d.Id);
            operation.AddIntParam(DB_ID_USUARIO, d.UsuarioId);
            operation.AddIntParam(DB_ID_PROVINCIA, d.ProvinciaId);
            operation.AddIntParam(DB_ID_CANTON, d.CantonId);
            operation.AddIntParam(DB_ID_DISTRITO, d.DistritoId);
            operation.AddVarcharParam(DB_DETALLES, d.Detalles);
            operation.AddVarcharParam(DB_LATITUD, d.Latitud);
            operation.AddVarcharParam(DB_LONGITUD, d.Longitud);
            operation.AddVarcharParam(DB_ALIAS, d.Alias);

            return operation;
        }
    }
}
