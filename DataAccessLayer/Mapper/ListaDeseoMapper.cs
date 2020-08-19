using DataAccessLayer.Dao;
using Entities;
using MimeKit;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    public class ListaDeseoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_LISTA_DESEO" };

            var c = (ListaDeseo)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.id_usuario);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_LISTA_DESEO" };

            var c = (ListaDeseo)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.id_usuario);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_LISTA_DESEO" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_LISTA_DESEO" };

            var c = (ListaDeseo)entity;
            operation.AddIntParam(DB_COL_ID, c.id);
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_USUARIO, c.id_usuario);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_LISTA_DESEO" };

            var c = (ListaDeseo)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
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
            var listadeseo = new ListaDeseo
            {
                id = GetIntValue(row, DB_COL_ID),
                id_item = GetIntValue(row, DB_COL_ID_ITEM),
                id_usuario = GetIntValue(row, DB_COL_ID_USUARIO),
            };

            return listadeseo;
        }


        public SqlOperation GetRetriveAllByUser(int id_usuario)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_LISTA_DESEO_USUARIO" };
            operation.AddIntParam(DB_COL_ID_USUARIO, id_usuario);
            return operation;
        }

    }
}