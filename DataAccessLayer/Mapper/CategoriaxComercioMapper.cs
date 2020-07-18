using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class CategoriaxComercioMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_CATEGORIA = "ID_CATEGORIA";
        private const string DB_COL_CATEGORIA = "CATEGORIA";
        private const string DB_COL_CEDULA_JURIDICA = "CEDULA_JURIDICA";
        private const string DB_COL_NOMBRE_CATEGORIA = "NOMBRE";
        public string BuildObject(Dictionary<string, object> row)
        {
            string nombre = GetStringValue(row, DB_COL_NOMBRE_CATEGORIA);
            return nombre;
        }

        public List<string> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<string>();

            foreach (var row in lstRows)
            {
                var categoria = BuildObject(row);
                lstResults.Add(categoria);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(string Categoria, string CedulaJuridica)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_COMERCIOXCATEGORIA" };

            operation.AddVarcharParam(DB_COL_CATEGORIA, Categoria);
            operation.AddVarcharParam(DB_COL_CEDULA_JURIDICA, CedulaJuridica);

            return operation;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_CATEGORIASXCOMERCIO" };
            var c = (CategoriaxComercio)entity;
            operation.AddIntParam(DB_COL_ID_COMERCIO, c.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        BaseEntity IObjectMapper.BuildObject(Dictionary<string, object> row)
        {
            throw new NotImplementedException();
        }

        List<BaseEntity> IObjectMapper.BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            throw new NotImplementedException();
        }
    }
}
