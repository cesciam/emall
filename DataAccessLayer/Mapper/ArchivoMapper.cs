using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class ArchivoMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_ENLACE = "ENLACE";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_CEDULA_JURIDICA_COMERCIO = "CEDULA_JURIDICA";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var archivo = new Archivo
            {
                Id = GetIntValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Enlace = GetStringValue(row, DB_COL_ENLACE),
                Tipo = GetStringValue(row, DB_COL_TIPO),
                Id_Comercio = GetIntValue(row, DB_COL_ID_COMERCIO)
            };

            return archivo;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var archivo = BuildObject(row);
                lstResults.Add(archivo);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity, string CedulaJuridica)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_ARCHIVO_COMERCIO" };
            var a = (Archivo)entity;

            operation.AddVarcharParam(DB_COL_NOMBRE, a.Nombre);
            operation.AddVarcharParam(DB_COL_ENLACE, a.Enlace);
            operation.AddVarcharParam(DB_COL_TIPO, a.Tipo);
            operation.AddVarcharParam(DB_COL_CEDULA_JURIDICA_COMERCIO, CedulaJuridica);

            return operation;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_ARCHIVO_USUARIO" };
            var a = (Archivo)entity;

            operation.AddVarcharParam(DB_COL_NOMBRE, a.Nombre);
            operation.AddVarcharParam(DB_COL_ENLACE, a.Enlace);
            operation.AddVarcharParam(DB_COL_TIPO, a.Tipo);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ARCHIVOS_COMERCIO" };
            var a = (Archivo)entity;
            operation.AddIntParam(DB_COL_ID_COMERCIO, a.Id_Comercio);

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
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_ARCHIVO_COMERCIO" };
            var a = (Archivo)entity;

            operation.AddIntParam(DB_COL_ID, a.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, a.Nombre);
            operation.AddVarcharParam(DB_COL_ENLACE, a.Enlace);
            operation.AddVarcharParam(DB_COL_TIPO, a.Tipo);

            return operation;
        }
    }
}
