using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace DataAccessLayer.Mapper
{
    public class ConfiguracionMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_VALOR = "VALOR";
        private const string DB_COL_CODIGO = "CODIGO";
        private const string DB_COL_DESCRIPCION = "DESCRIPCION";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var configuracion = new Configuracion
            {
                id = GetIntValue(row, DB_COL_ID),
                nombre = GetStringValue(row, DB_COL_NOMBRE),
                valor = GetIntValue(row, DB_COL_VALOR),
                descripcion = GetStringValue(row, DB_COL_DESCRIPCION),
                codigo = GetStringValue(row, DB_COL_CODIGO)
            };

            return configuracion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var promocion = BuildObject(row);
                lstResult.Add(promocion);
            }

            return lstResult;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "CREAR_CONFIGURACION" };
            var c = (Configuracion)entity;

            operacion.AddVarcharParam(DB_COL_NOMBRE, c.nombre);
            operacion.AddIntParam(DB_COL_VALOR, c.valor);
            operacion.AddVarcharParam(DB_COL_CODIGO, c.codigo);
            operacion.AddVarcharParam(DB_COL_DESCRIPCION, c.descripcion);

            return operacion;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "ELIMINAR_CONFIGURACION" };

            var c = (Configuracion)entity;
            operacion.AddIntParam(DB_COL_ID, c.id);
            return operacion;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_CONFIGURACION" };

            return operacion;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CONFIGURACION" };

            var c = (Configuracion)entity;
            operacion.AddVarcharParam(DB_COL_CODIGO, c.codigo);

            return operacion;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "MODIFICAR_CONFIGURACION" };
            var c = (Configuracion)entity;

            operacion.AddIntParam(DB_COL_ID, c.id);
            operacion.AddVarcharParam(DB_COL_NOMBRE, c.nombre);
            operacion.AddIntParam(DB_COL_VALOR, c.valor);
            operacion.AddVarcharParam(DB_COL_CODIGO, c.codigo);
            operacion.AddVarcharParam(DB_COL_DESCRIPCION, c.descripcion);


            return operacion;
        }
    }
}
