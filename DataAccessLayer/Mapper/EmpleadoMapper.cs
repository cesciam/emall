using DataAccessLayer.Dao;
using Entities;
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

        internal SqlOperation GetRetriveAllDatosStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_DATOS_EMPLEADO_PR" };

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
            operation.AddIntParam(DB_COL_ID_USUARIO, e.id_usuario);
            operation.AddIntParam(DB_COL_ID_ROL, e.id_rol);
            operation.AddIntParam(DB_COL_ID_SUCURSAL, e.id_sucursal);
            return operation;
        }
    }
}
