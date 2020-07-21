using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class PromocionMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_PORCENTAJE = "PORCENTAJE";
        private const string DB_COL_CODIGO = "CODIGO";
        private const string DB_COL_CANTIDAD = "CANTIDAD";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            double porcentaje = GetDoubleValue(row, DB_COL_PORCENTAJE);

            var promocion = new Promocion
            {
                id = GetIntValue(row, DB_COL_ID),
                nombre = GetStringValue(row, DB_COL_NOMBRE),
                porcentaje = GetDecimalValue(row, DB_COL_PORCENTAJE),
                codigo = GetStringValue(row, DB_COL_CODIGO),
                cantidad = GetIntValue(row, DB_COL_CANTIDAD),
                id_comercio = GetIntValue(row, DB_COL_ID_COMERCIO),
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL)
            };

            return promocion;
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
            var operacion = new SqlOperation { ProcedureName = "CREAR_PROMOCION" };
            var p = (Promocion) entity;

            operacion.AddVarcharParam(DB_COL_NOMBRE, p.nombre);
            operacion.AddDoubleParam(DB_COL_PORCENTAJE, decimal.ToDouble(p.porcentaje));
            operacion.AddVarcharParam(DB_COL_CODIGO, p.codigo);
            operacion.AddIntParam(DB_COL_CANTIDAD, p.cantidad);
            if (p.id_comercio > 0)
            {
                operacion.AddIntParam(DB_COL_ID_COMERCIO, p.id_comercio);
            }
            else
            {
                operacion.AddNullParam(DB_COL_ID_COMERCIO);
            }

            if (p.id_sucursal > 0)
            {
                operacion.AddIntParam(DB_COL_ID_SUCURSAL, p.id_sucursal);
            }
            else
            {
                operacion.AddNullParam(DB_COL_ID_SUCURSAL);
            }
            return operacion;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "ELIMINAR_PROMOCION" };

            var p = (Promocion)entity;
            operacion.AddIntParam(DB_COL_ID, p.id);
            return operacion;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_PROMOCION" };

            return operacion;
        }

        public SqlOperation GetRetriveAllByComercioStament(BaseEntity entity) 
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_PROMOCION_COMERCIO" };
            var p = (Promocion)entity;

            operacion.AddIntParam(DB_COL_ID_COMERCIO, p.id_comercio);

            return operacion;

        }

        public SqlOperation GetRetriveAllBySucursalStament(BaseEntity entity) 
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_PROMOCION_SUCURSAL" };
            var p = (Promocion)entity;

            operacion.AddIntParam(DB_COL_ID_SUCURSAL, p.id_sucursal);

            return operacion;
        }

        public SqlOperation GetRetriveAllByAppStament() 
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_PROMOCION_APP" };            

            return operacion;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_PROMOCION"};

            var p = (Promocion)entity;
            operacion.AddIntParam(DB_COL_ID, p.id);

            return operacion;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "MODIFICAR_PROMOCION" };

            var p = (Promocion)entity;

            operacion.AddIntParam(DB_COL_ID, p.id);
            operacion.AddVarcharParam(DB_COL_NOMBRE, p.nombre);
            operacion.AddDoubleParam(DB_COL_PORCENTAJE, decimal.ToDouble(p.porcentaje));
            operacion.AddVarcharParam(DB_COL_CODIGO, p.codigo);
            operacion.AddIntParam(DB_COL_CANTIDAD, p.cantidad);
            if (p.id_comercio > 0)
            {
                operacion.AddIntParam(DB_COL_ID_COMERCIO, p.id_comercio);
            }
            else
            {
                operacion.AddNullParam(DB_COL_ID_COMERCIO);
            }

            if (p.id_sucursal > 0)
            {
                operacion.AddIntParam(DB_COL_ID_SUCURSAL, p.id_sucursal);
            }
            else
            {
                operacion.AddNullParam(DB_COL_ID_SUCURSAL);
            }

            return operacion;
        }


    }
}
