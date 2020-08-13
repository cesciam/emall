using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper {
    public class CalificacionMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_CALIFICACION = "CALIFICACION";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_ITEM = "ID_ITEM";


        public SqlOperation GetCreateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "CREAR_CALIFICACION" };

            var c = (Calificacion)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.UsuarioId);
            operation.AddIntParam(DB_COL_CALIFICACION, c.Puntaje);

            if (c.ComercioId == 0)
                operation.AddNullParam(DB_COL_ID_COMERCIO);
            else
                operation.AddIntParam(DB_COL_ID_COMERCIO, c.ComercioId);

            if (c.ItemId == 0)
                operation.AddNullParam(DB_COL_ID_ITEM);
            else
                operation.AddIntParam(DB_COL_ID_ITEM, c.ItemId);

            return operation;
        }

        public SqlOperation GetRetriveItemStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CALIFICACION_ITEM" };

            var c = (Calificacion)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.ItemId);

            return operation;
        }

        public SqlOperation GetRetriveComercioStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CALIFICACION_COMERCIO" };

            var c = (Calificacion)entity;
            operation.AddIntParam(DB_COL_ID_COMERCIO, c.ComercioId);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_CALIFICACIONES" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_CALIFICACION" };

            var c = (Calificacion)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.UsuarioId);
            operation.AddIntParam(DB_COL_CALIFICACION, c.Puntaje);

            if (c.ComercioId == 0)
                operation.AddNullParam(DB_COL_ID_COMERCIO);
            else
                operation.AddIntParam(DB_COL_ID_COMERCIO, c.ComercioId);

            if (c.ItemId == 0)
                operation.AddNullParam(DB_COL_ID_ITEM);
            else
                operation.AddIntParam(DB_COL_ID_ITEM, c.ItemId);

            return operation;
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
            var calificacion = new Calificacion {
                Id = GetIntValue(row, DB_COL_ID),
                UsuarioId = GetIntValue(row, DB_COL_ID_USUARIO),
                ComercioId = GetIntValue(row, DB_COL_ID_COMERCIO),
                ItemId = GetIntValue(row, DB_COL_ID_ITEM),
                Puntaje = GetIntValue(row, DB_COL_CALIFICACION),
            };

            return calificacion;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CALIFICACION" };

            var c = (Calificacion)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, c.UsuarioId);

            if (c.ComercioId == 0)
                operation.AddNullParam(DB_COL_ID_COMERCIO);
            else
                operation.AddIntParam(DB_COL_ID_COMERCIO, c.ComercioId);

            if (c.ItemId == 0)
                operation.AddNullParam(DB_COL_ID_ITEM);
            else
                operation.AddIntParam(DB_COL_ID_ITEM, c.ItemId);

            return operation;
        }

        SqlOperation ISqlStaments.GetDeleteStatement(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
