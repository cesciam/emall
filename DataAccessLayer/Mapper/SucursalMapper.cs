using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class SucursalMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_LONGITUD = "LONGITUD";
        private const string DB_COL_LATITUD = "LATITUD";
        private const string DB_COL_DETALLES_DIRECCION = "DETALLES_DIRECCION";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_HORARIO = "ID_HORARIO";
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var sucursal = new Sucursal
            {
                Id = GetIntValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Longitud = GetStringValue(row, DB_COL_LONGITUD),
                Latitud = GetStringValue(row, DB_COL_LATITUD),
                DetallesDireccion = GetStringValue(row, DB_COL_DETALLES_DIRECCION),
                IdComercio = GetIntValue(row, DB_COL_ID_COMERCIO),
                IdHorario = GetIntValue(row, DB_COL_ID_HORARIO)
            };

            return sucursal;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach (var row in lstRows)
            {
                var sucursal = BuildObject(row);
                lstResults.Add(sucursal);
            }
            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_SUCURSAL" };
            var s = (Sucursal)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, s.Nombre);
            operation.AddVarcharParam(DB_COL_LONGITUD, s.Longitud);
            operation.AddVarcharParam(DB_COL_LATITUD, s.Latitud);
            operation.AddVarcharParam(DB_COL_DETALLES_DIRECCION, s.DetallesDireccion);
            operation.AddIntParam(DB_COL_ID_COMERCIO, s.IdComercio);
            operation.AddIntParam(DB_COL_ID_HORARIO, s.IdHorario);
            
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_SUCURSAL" };
            var s = (Sucursal)entity;
            operation.AddIntParam(DB_COL_ID, s.Id);
            
            return operation;
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_SUCURSAL" };
            var s = (Sucursal)entity;
            operation.AddIntParam(DB_COL_ID_COMERCIO, s.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_SUCURSAL" };
            var s = (Sucursal)entity;
            operation.AddIntParam(DB_COL_ID, s.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_SUCURSAL" };
            var s = (Sucursal)entity;
            operation.AddIntParam(DB_COL_ID, s.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, s.Nombre);
            operation.AddVarcharParam(DB_COL_LONGITUD, s.Longitud);
            operation.AddVarcharParam(DB_COL_LATITUD, s.Latitud);
            operation.AddVarcharParam(DB_COL_DETALLES_DIRECCION, s.DetallesDireccion);

            return operation;
        }
    }
}
