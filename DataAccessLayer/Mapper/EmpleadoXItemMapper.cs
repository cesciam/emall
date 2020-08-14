using DataAccessLayer.Dao;
using Entities;
using MimeKit;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    public class EmpleadoXItemMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_EMPLEADOXITEM" };

            var c = (EmpleadosXItem)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_EMPLEADOXITEM" };

            var c = (EmpleadosXItem)entity;
            operation.AddIntParam(DB_COL_ID, c.id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_EMPLEADOXITEM" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_EMPLEADOXITEM" };

            var c = (EmpleadosXItem)entity;
            operation.AddIntParam(DB_COL_ID, c.id);
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operation.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_EMPLEADOXITEM" };

            var c = (EmpleadosXItem)entity;
            operation.AddIntParam(DB_COL_ID, c.id);
            return operation;
        }

        public SqlOperation GetDeleteEmpleadosItem(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_EMPLEADOS_ITEM" };

            var c = (EmpleadosXItem)entity;
            operation.AddIntParam(DB_COL_ID_ITEM, c.id_item);
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
            var empleadoxitem = new EmpleadosXItem
            {
                id = GetIntValue(row, DB_COL_ID),
                id_item = GetIntValue(row, DB_COL_ID_ITEM),
                id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
            };

            return empleadoxitem;
        }


        public SqlOperation GetRetriveAllByItem(int id_item)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_EMPLEADO_ITEM" };
            operation.AddIntParam(DB_COL_ID_ITEM, id_item);
            return operation;
        }

    }
}