using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class FacturaMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";
        private const string DB_COL_NOMBRE_EMPLEADO = "NOMBRE_EMPLEADO";
        private const string DB_COL_APELLIDO_EMPLEADO = "APELLIDO_EMPLEADO";
        private const string DB_COL_CEDULA_USUARIO = "CEDULA_USUARIO";
        private const string DB_COL_NOMBRE_USUARIO = "NOMBRE_USUARIO";
        private const string DB_COL_APELLIDO_USUARIO = "APELLIDO_USUARIO";
        private const string DB_COL_TELEFONO_USUARIO = "TELEFONO_USUARIO";
        private const string DB_COL_CORREO_USUARIO = "CORREO_USUARIO";
        private const string DB_COL_NOMBRE_PROVINCIA = "NOMBRE_PROVINCIA";
        private const string DB_COL_NOMBRE_CANTON = "NOMBRE_CANTON";
        private const string DB_COL_NOMBRE_DISTRITO = "NOMBRE_DISTRITO";
        private const string DB_COL_DETALLES_DIRECCION = "DETALLES_DIRECCION";
        private const string DB_COL_NOMBRE_SUCURSAL = "NOMBRE_SUCURSAL";
        private const string DB_COL_CEDULA_JURIDICA = "CEDULA_JURIDICA";
        private const string DB_COL_ID_TRANSACCION = "ID_TRANSACCION";
        private const string DB_COL_ID_PROMOCION = "ID_PROMOCION";
        private const string DB_COL_NOMBRE_PROMOCION = "NOMBRE_PROMOCION";
        private const string DB_COL_PORCENTAJE = "PORCENTAJE";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var factura = new Factura
            {
                Id = GetIntValue(row, DB_COL_ID),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                IdUsuario = GetIntValue(row, DB_COL_ID_USUARIO),
                IdEmpleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
                NombreEmpleado = GetStringValue(row, DB_COL_NOMBRE_EMPLEADO),
                ApellidoEmpleado = GetStringValue(row, DB_COL_APELLIDO_EMPLEADO),
                CedulaUsuario = GetStringValue(row, DB_COL_CEDULA_USUARIO),
                NombreUsuario = GetStringValue(row, DB_COL_NOMBRE_USUARIO),
                ApellidoUsuario = GetStringValue(row, DB_COL_APELLIDO_USUARIO),
                TelefonoUsuario = GetStringValue(row, DB_COL_TELEFONO_USUARIO),
                CorreoUsuario = GetStringValue(row, DB_COL_CORREO_USUARIO),
                NombreProvincia = GetStringValue(row, DB_COL_NOMBRE_PROVINCIA),
                NombreCanton = GetStringValue(row, DB_COL_NOMBRE_CANTON),
                NombreDistrito = GetStringValue(row, DB_COL_NOMBRE_DISTRITO),
                DetallesDireccion = GetStringValue(row, DB_COL_DETALLES_DIRECCION),
                NombreSucursal = GetStringValue(row, DB_COL_NOMBRE_SUCURSAL),
                CedulaJuridica = GetStringValue(row, DB_COL_CEDULA_JURIDICA),
                IdTransaccion = GetIntValue(row, DB_COL_ID_TRANSACCION),
                IdPromocion = GetIntValue(row, DB_COL_ID_PROMOCION),
                NombrePromocion = GetStringValue(row, DB_COL_NOMBRE_PROMOCION),
                Porcentaje = GetDoubleValue(row, DB_COL_PORCENTAJE)
            };

            return factura;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var factura = BuildObject(row);
                lstResults.Add(factura);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_FACTURA" };
            var factura = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, factura.IdUsuario);
            operation.AddIntParam(DB_COL_ID_EMPLEADO, factura.IdEmpleado);
            operation.AddVarcharParam(DB_COL_NOMBRE_EMPLEADO, factura.NombreEmpleado);
            operation.AddVarcharParam(DB_COL_APELLIDO_EMPLEADO, factura.ApellidoEmpleado);
            operation.AddVarcharParam(DB_COL_CEDULA_USUARIO, factura.CedulaUsuario);
            operation.AddVarcharParam(DB_COL_NOMBRE_USUARIO, factura.NombreUsuario);
            operation.AddVarcharParam(DB_COL_APELLIDO_USUARIO, factura.ApellidoUsuario);
            operation.AddVarcharParam(DB_COL_TELEFONO_USUARIO, factura.TelefonoUsuario);
            operation.AddVarcharParam(DB_COL_CORREO_USUARIO, factura.CorreoUsuario);
            operation.AddVarcharParam(DB_COL_NOMBRE_SUCURSAL, factura.NombreSucursal);
            operation.AddVarcharParam(DB_COL_CEDULA_JURIDICA, factura.CedulaJuridica);
            operation.AddIntParam(DB_COL_ID_TRANSACCION, factura.IdTransaccion);
            //operation.AddIntParam(DB_COL_ID_PROMOCION, factura.IdPromocion);
            //operation.AddVarcharParam(DB_COL_NOMBRE_PROMOCION, factura.NombrePromocion);
            //operation.AddDoubleParam(DB_COL_PORCENTAJE, factura.Porcentaje);

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
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_FACTURASXUSUARIO" };
            var factura = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, factura.IdUsuario);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
