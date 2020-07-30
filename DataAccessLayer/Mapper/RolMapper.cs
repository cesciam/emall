using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    class RolMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_DESCRIPCION = "DESCRIPCION";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var rol = new Rol
            {
                id = GetIntValue(row, DB_COL_ID),
                nombre = GetStringValue(row, DB_COL_NOMBRE),
                descripcion = GetStringValue(row, DB_COL_DESCRIPCION),
                id_comercio = GetIntValue(row, DB_COL_ID_COMERCIO)
            };
            return rol;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var customer = BuildObject(row);
                lstResults.Add(customer);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_ROL_PR" };
            var rol = (Rol)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, rol.nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, rol.descripcion);
            operation.AddIntParam(DB_COL_ID_COMERCIO, rol.id_comercio);
            return operation;

        }

        internal SqlOperation GetRetriveByIdComercioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ROL_COMERCIO_PR" };
            var rol = (Rol)entity;
            operation.AddIntParam(DB_COL_ID_COMERCIO, rol.id_comercio);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_ROL_PR" };
            var rol = (Rol)entity;
            operation.AddIntParam(DB_COL_ID, rol.id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ROL_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ROL_PR" };
            var rol = (Rol)entity;
            operation.AddIntParam(DB_COL_ID, rol.id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_ROL_PR" };
            var rol = (Rol)entity;
            operation.AddIntParam(DB_COL_ID, rol.id);
            operation.AddVarcharParam(DB_COL_NOMBRE, rol.nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, rol.descripcion);
            operation.AddIntParam(DB_COL_ID_COMERCIO, rol.id_comercio);
            return operation;
        }
    }
}
