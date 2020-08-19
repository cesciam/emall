using DataAccessLayer.Dao;
using Entities;
using Newtonsoft.Json.Schema;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    class EnvioMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_CODIGO = "CODIGO";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_ID_ENVIO = "ID_ENVIO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var envio = new Envio
            {
                Id = GetIntValue(row, DB_COL_ID),
                Estado = GetIntValue(row, DB_COL_ESTADO),
                IdEmpleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
                IdCliente = GetIntValue(row, DB_COL_ID_CLIENTE)
            };

            return envio;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var envio = BuildObject(row);
                lstResults.Add(envio);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var e = (Envio)entity;

            var operation = new SqlOperation { ProcedureName = "CREAR_ENVIO" };
            operation.AddIntParam(DB_COL_ESTADO, e.Estado);
            operation.AddIntParam(DB_COL_ID_CLIENTE, e.IdCliente);
            operation.AddVarcharParam(DB_COL_CODIGO, e.Codigo);

            return operation;
        }

        public SqlOperation CreateItemxEnvioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_ITEMXENVIO" };
            var itemxEnvio = (ItemxEnvio)entity;

            operation.AddIntParam(DB_COL_ID_ITEM, itemxEnvio.IdItem);
            operation.AddIntParam(DB_COL_ID_ENVIO, itemxEnvio.IdEnvio);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ITEMXENVIO" };
            var envio = (Envio)entity;

            operation.AddIntParam(DB_COL_ID, envio.Id);

            return operation;
        }

        public SqlOperation GetRetriveBySucursalStatement(int id_sucursal)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ENVIO_SUCURSAL" };
            operation.AddIntParam("ID_SUCURSAL", id_sucursal);
            return operation;
        }

        

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ENVIO" };
            var envio = (Envio)entity;

            operation.AddIntParam(DB_COL_ID, envio.Id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_ENVIO_FINALIZADO" };
            var envio = (Envio)entity;

            operation.AddIntParam(DB_COL_ID, envio.Id);
            return operation;
        }
    }
}
