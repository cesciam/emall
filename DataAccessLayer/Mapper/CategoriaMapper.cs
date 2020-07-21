using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper
{
    class CategoriaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE"; 
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var categoria = new Categoria {
                Id = GetIntValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE)
            };
            return categoria; 
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var categoria = BuildObject(row);
                lstResults.Add(categoria);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_CATEGORIA" };

            var c = (Categoria)entity; 
            operation.AddVarcharParam(DB_COL_NOMBRE,c.Nombre);

            return operation; 
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_CATEGORIA" };
            var c = (Categoria)entity;

            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation; 
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_CATEGORIA" };
            return operation; 
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_CATEGORIA" };
            var c = (Categoria)entity;

            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_CATEGORIA" };
            var c = (Categoria)entity;

            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);

            return operation;
        }
    }
}
