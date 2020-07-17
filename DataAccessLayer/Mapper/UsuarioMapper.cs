using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper {
    public class UsuarioMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CEDULA = "CEDULA";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_APELLIDO = "APELLIDO";
        private const string DB_COL_CORREO = "CORREO";
        private const string DB_COL_TELEFONO = "TELEFONO";
        private const string DB_COL_ID_FOTO = "ID_FOTO";
        private const string DB_COL_TELEFONO_CONFIRMADO = "TELEFONO_CONFIRMADO";
        private const string DB_COL_CORREO_CONFIRMADO = "CORREO_CONFIRMADO";
        private const string DB_COL_CODIGO_TELEFONO = "CODIGO_TELEFONO";
        private const string DB_COL_CODIGO_CORREO = "CODIGO_CORREO";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";

        public SqlOperation GetCreateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "CREAR_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);
            operation.AddVarcharParam(DB_COL_CEDULA, u.Cedula);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDO, u.Apellido);
            operation.AddVarcharParam(DB_COL_CORREO, u.Correo);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddIntParam(DB_COL_ID_FOTO, u.Foto);
            operation.AddIntParam(DB_COL_TELEFONO_CONFIRMADO, u.TelefonoConfirmado);
            operation.AddIntParam(DB_COL_CORREO_CONFIRMADO, u.CorreoConfirmado);
            operation.AddVarcharParam(DB_COL_CODIGO_TELEFONO, u.CodigoTelefono);
            operation.AddVarcharParam(DB_COL_CODIGO_CORREO, u.CodigoCorreo);
            operation.AddIntParam(DB_COL_ESTADO, u.Estado);
            operation.AddIntParam(DB_COL_TIPO, u.Tipo);
            operation.AddIntParam(DB_COL_ID_COMERCIO, u.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_USUARIO" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);
            operation.AddVarcharParam(DB_COL_CEDULA, u.Cedula);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDO, u.Apellido);
            operation.AddVarcharParam(DB_COL_CORREO, u.Correo);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddIntParam(DB_COL_ID_FOTO, u.Foto);
            operation.AddIntParam(DB_COL_TELEFONO_CONFIRMADO, u.TelefonoConfirmado);
            operation.AddIntParam(DB_COL_CORREO_CONFIRMADO, u.CorreoConfirmado);
            operation.AddVarcharParam(DB_COL_CODIGO_TELEFONO, u.CodigoTelefono);
            operation.AddVarcharParam(DB_COL_CODIGO_CORREO, u.CodigoCorreo);
            operation.AddIntParam(DB_COL_ESTADO, u.Estado);
            operation.AddIntParam(DB_COL_TIPO, u.Tipo);
            operation.AddIntParam(DB_COL_ID_COMERCIO, u.IdComercio);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);

            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows) {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows) {
                var usuario = BuildObject(row);
                lstResults.Add(usuario);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row) {
            var usuario = new Usuario {
                Id = GetIntValue(row, DB_COL_ID),
                Cedula = GetStringValue(row, DB_COL_CEDULA),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Apellido = GetStringValue(row, DB_COL_APELLIDO),
                Correo = GetStringValue(row, DB_COL_CORREO),
                Telefono = GetStringValue(row, DB_COL_TELEFONO),
                Foto = GetIntValue(row, DB_COL_ID_FOTO),
                TelefonoConfirmado = GetIntValue(row, DB_COL_TELEFONO_CONFIRMADO),
                CorreoConfirmado = GetIntValue(row, DB_COL_CORREO_CONFIRMADO),
                CodigoTelefono = GetStringValue(row, DB_COL_CODIGO_TELEFONO),
                CodigoCorreo = GetStringValue(row, DB_COL_CODIGO_CORREO),
                Estado = GetIntValue(row, DB_COL_ESTADO),
                Tipo = GetIntValue(row, DB_COL_TIPO),
                IdComercio = GetIntValue(row, DB_COL_ID_COMERCIO),
            };

            return usuario;
        }

    }
}
