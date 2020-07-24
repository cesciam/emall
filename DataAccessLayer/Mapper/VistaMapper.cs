using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class VistaMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var vista = new Vista
            {
                id = GetIntValue(row, DB_COL_ID),
                nombre = GetStringValue(row, DB_COL_NOMBRE)
            };
            return vista;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach(var row in lstRows)
            {
                var vista = BuildObject(row);
                lstResults.Add(vista);
            }
            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_VISTA_PR" };

            var v = (Vista)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, v.nombre);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_VISTA_PR" };

            var v = (Vista)entity;
            operation.AddIntParam(DB_COL_ID, v.id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_VISTA_PR" };

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_VISTA_PR" };

            var v = (Vista)entity;
            operation.AddIntParam(DB_COL_ID, v.id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_VISTA_PR" };

            var v = (Vista)entity;
            operation.AddIntParam(DB_COL_ID, v.id);
            operation.AddVarcharParam(DB_COL_NOMBRE, v.nombre);

            return operation;
        }
    }
}
