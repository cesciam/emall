using DataAccessLayer.Dao;
using Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    public class ItemMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_DESCRIPCION = "DESCRIPCION";
        private const string DB_COL_PRECIO = "PRECIO";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_INVENTARIO = "INVENTARIO";
        private const string DB_COL_DURACION = "DURACION";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_ID_IMPUESTO = "ID_IMPUESTO";
        private const string DB_COL_ID_FOTO = "ID_FOTO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_ITEM" };

            var c = (Item)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, c.nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, c.descripcion);
            operation.AddDoubleParam(DB_COL_PRECIO, c.precio);
            operation.AddVarcharParam(DB_COL_TIPO, c.tipo);
            operation.AddIntParam(DB_COL_INVENTARIO, c.inventario);
            operation.AddIntParam(DB_COL_DURACION, c.duracion);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);
            operation.AddIntParam(DB_COL_ID_IMPUESTO, c.id_impuesto);
            operation.AddVarcharParam(DB_COL_ID_FOTO, c.id_foto);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ITEM" };

            var c = (Item)entity;
            operation.AddIntParam(DB_COL_ID, c.id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ITEM" };
            return operation;
        }

        public SqlOperation GetRetriveByEnvioStatement(int id_envio)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ITEMS_ENVIO" };
            operation.AddIntParam("ID_ENVIO", id_envio);
            return operation;
        }

        public SqlOperation GetRetriveByCitaStatement(int id_cita)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_ITEM_CITA" };
            operation.AddIntParam("ID_CITA", id_cita);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_ITEM" };

            var c = (Item)entity;
            operation.AddIntParam(DB_COL_ID, c.id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, c.descripcion);
            operation.AddDoubleParam(DB_COL_PRECIO, c.precio);
            operation.AddVarcharParam(DB_COL_TIPO, c.tipo);
            operation.AddIntParam(DB_COL_INVENTARIO, c.inventario);
            operation.AddIntParam(DB_COL_DURACION, c.duracion);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);
            operation.AddIntParam(DB_COL_ID_IMPUESTO, c.id_impuesto);
            operation.AddVarcharParam(DB_COL_ID_FOTO, c.id_foto);

            return operation;
        }

        public SqlOperation GetUpdateInventarioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_INVENTARIO_ITEM" };
            var item = (Item)entity;
            operation.AddIntParam(DB_COL_ID, item.id);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_ITEM" };

            var c = (Item)entity;
            operation.AddIntParam(DB_COL_ID, c.id);
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
            var item = new Item
            {
                id = GetIntValue(row, DB_COL_ID),
                nombre = GetStringValue(row, DB_COL_NOMBRE),
                descripcion = GetStringValue(row, DB_COL_DESCRIPCION),
                precio = GetDecimalValue(row, DB_COL_PRECIO),
                tipo = GetStringValue(row, DB_COL_TIPO),
                inventario = GetIntValue(row, DB_COL_INVENTARIO),
                duracion = GetIntValue(row, DB_COL_DURACION),
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL),
                id_impuesto = GetIntValue(row, DB_COL_ID_IMPUESTO),
                id_foto = GetStringValue(row, DB_COL_ID_FOTO),
            };

            return item;
        }


        public SqlOperation GetRetriveAllBySucursal(int id_sucursal)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ITEM_SUCURSAL" };
            operation.AddIntParam(DB_COL_ID_SUCURSAL, id_sucursal);
            return operation;
        }

        public SqlOperation GetRetriveAllByTipo(string tipo)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_ITEM_TIPO" };
            operation.AddVarcharParam(DB_COL_TIPO, tipo);
            return operation;
        }

        public SqlOperation ItemBusqueda(string busqueda)
        {



            var operation = new SqlOperation { ProcedureName = "BUSCAR_ITEM" };
            operation.AddVarcharParam(DB_COL_NOMBRE, busqueda);
            //operation.AddVarcharParam(DB_COL_DESCRIPCION, busqueda);
            return operation;
        }

    }
}