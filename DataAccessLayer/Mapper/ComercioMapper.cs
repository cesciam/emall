using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class ComercioMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ADMIN = "ID_ADMIN";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_NOMBRE_LEGAL = "NOMBRE_LEGAL";
        private const string DB_COL_CEDULA_JURIDICA = "CEDULA_JURIDICA";
        private const string DB_COL_ESTADO = "ESTADO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var comercio = new Comercio
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdAdmin = GetIntValue(row, DB_COL_ID_ADMIN),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                NombreLegal = GetStringValue(row, DB_COL_NOMBRE_LEGAL),
                CedulaJuridica = GetStringValue(row, DB_COL_CEDULA_JURIDICA),
                Estado = GetIntValue(row, DB_COL_ESTADO)
            };
            return comercio;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var comercio = BuildObject(row);
                lstResults.Add(comercio);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_COMERCIO" };
            var c = (Comercio)entity;

            operation.AddIntParam(DB_COL_ID_ADMIN, c.IdAdmin);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_NOMBRE_LEGAL, c.NombreLegal);
            operation.AddVarcharParam(DB_COL_CEDULA_JURIDICA, c.CedulaJuridica);
            operation.AddIntParam(DB_COL_ESTADO, c.Estado);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_COMERCIO" };
            var c = (Comercio)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_COMERCIO" };
            return operation;
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ADMIN_COMERIO" };
            var c = (Comercio)entity;
            operation.AddIntParam(DB_COL_ID_ADMIN, c.IdAdmin);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_COMERCIO" };
            var c = (Comercio)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_COMERCIO" };
            var c = (Comercio)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_NOMBRE_LEGAL, c.NombreLegal);

            return operation;
        }

        public SqlOperation GetUpdateStateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CAMBIAR_ESTADO_COMERCIO" };
            var c = (Comercio)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddIntParam(DB_COL_ESTADO, c.Estado);

            return operation;
        }
    }
}
