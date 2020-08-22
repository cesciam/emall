using DataAccessLayer.Dao;
using Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    public class MultaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_FECHA = "FECHA";




        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_MULTA" };

            var c = (Multa)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, c.id_usuario);
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_COMERCIO, c.id_comercio);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);
            operation.AddDateParam(DB_COL_FECHA, c.fecha);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_MULTA" };

            var c = (Multa)entity;
            operation.AddIntParam(DB_COL_ID, c.id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_MULTA" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_MULTA" };

            var c = (Multa)entity;
            operation.AddIntParam(DB_COL_ID, c.id);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_MULTA_USUARIO" };

            var c = (Multa)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, c.id_usuario);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var item = BuildObject(row);
                lstResults.Add(item);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var multa = new Multa
            {
                id = GetIntValue(row, DB_COL_ID),
                id_usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                id_item = GetIntValue(row, DB_COL_ID_ITEM),
                id_comercio = GetIntValue(row, DB_COL_ID_COMERCIO),
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL),
                fecha = GetDateValue(row, DB_COL_FECHA),
            };

            return multa;
        }


        public SqlOperation GetRetriveAllByUser(int id_usuario)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_MULTA_USUARIO" };
            operation.AddIntParam(DB_COL_ID_USUARIO, id_usuario);
            return operation;
        }

    }
}