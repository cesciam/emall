using DataAccessLayer.Dao;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    class EmpleadoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_ROL = "ID_ROL";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_COMERCIO_ID = "COMERCIO_ID";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var empleado = new Empleado
            {
                id = GetIntValue(row, DB_COL_ID),
                id_usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                id_rol = GetIntValue(row, DB_COL_ID_ROL),
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL)
            };
            return empleado;
        }

        public SqlOperation GetRetriveAllDatosStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_DATOS_EMPLEADO_PR" };

            return operation;
        }

        public SqlOperation GetRetriveAllDatosByComercioIdStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_DATOS_EMPLEADO_COMERCIO_PR" };
            var comercio = (Comercio)entity;
            operation.AddIntParam(DB_COL_COMERCIO_ID, comercio.Id);

            return operation;
        }

        public SqlOperation GetRetriveDatosByIdStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_DATOS_EMPLEADO_ID_PR" };
            var usuario = (Usuario)entity;
            operation.AddIntParam("ID_USUARIO", usuario.Id);

            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach(var row in lstRows)
            {
                var empleado = BuildObject(row);
                lstResults.Add(empleado);
            }
            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_EMPLEADO_PR" };
            var e = (Empleado)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, e.id_usuario);
            operation.AddIntParam(DB_COL_ID_ROL, e.id_rol);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, e.id_sucursal);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_EMPLEADO_PR" };

            var e = (Empleado)entity;
            operation.AddIntParam(DB_COL_ID, e.id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_EMPLEADO_PR" };

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_EMPLEADO_PR" };

            var e = (Empleado)entity;
            operation.AddIntParam(DB_COL_ID, e.id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_EMPLEADO_PR" };
            var e = (Empleado)entity;
            operation.AddIntParam(DB_COL_ID, e.id);
            operation.AddIntParam(DB_COL_ID_ROL, e.id_rol);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, e.id_sucursal);
            return operation;
        }
    }
}
