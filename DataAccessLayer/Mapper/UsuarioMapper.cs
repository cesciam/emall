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

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "OBTENER_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);

            return operation;
        }

        public SqlOperation Login(string correo) {
            var operation = new SqlOperation { ProcedureName = "LOGIN_USUARIO" };
            operation.AddVarcharParam(DB_COL_CORREO, correo.Trim());

            return operation;
        }

        public SqlOperation Activar(int id) {
            var operation = new SqlOperation { ProcedureName = "ACTIVAR_USUARIO" };
            operation.AddIntParam(DB_COL_ID, id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement() {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_USUARIO" };
            return operation;
        }

        public SqlOperation GetRetriveSomeStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "BUSCAR_USUARIO" };
            var u = (Usuario)entity;
            
            if (u.Id == 0)
                operation.AddNullParam(DB_COL_ID);
            else
                operation.AddIntParam(DB_COL_ID, u.Id);

            if (u.Cedula == null)
                operation.AddNullParam(DB_COL_CEDULA);
            else
                operation.AddVarcharParam(DB_COL_CEDULA, u.Cedula);

            if (u.Nombre == null)
                operation.AddNullParam(DB_COL_NOMBRE);
            else
                operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);

            if (u.Apellido == null)
                operation.AddNullParam(DB_COL_APELLIDO);
            else
                operation.AddVarcharParam(DB_COL_APELLIDO, u.Apellido);

            if (u.Correo == null)
                operation.AddNullParam(DB_COL_CORREO);
            else
                operation.AddVarcharParam(DB_COL_CORREO, u.Correo);

            if (u.Telefono == null)
                operation.AddNullParam(DB_COL_TELEFONO);
            else
                operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);

            if (u.Foto == 0)
                operation.AddNullParam(DB_COL_ID_FOTO);
            else
                operation.AddIntParam(DB_COL_ID_FOTO, u.Foto);

            if (u.TelefonoConfirmado == 0)
                operation.AddNullParam(DB_COL_TELEFONO_CONFIRMADO);
            else
                operation.AddIntParam(DB_COL_TELEFONO_CONFIRMADO, u.TelefonoConfirmado);

            if (u.CorreoConfirmado == 0)
                operation.AddNullParam(DB_COL_CORREO_CONFIRMADO);
            else
                operation.AddIntParam(DB_COL_CORREO_CONFIRMADO, u.CorreoConfirmado);

            if (u.CodigoTelefono == null)
                operation.AddNullParam(DB_COL_CODIGO_TELEFONO);
            else
                operation.AddVarcharParam(DB_COL_CODIGO_TELEFONO, u.CodigoTelefono);

            if (u.CodigoCorreo == null)
                operation.AddNullParam(DB_COL_CODIGO_CORREO);
            else
                operation.AddVarcharParam(DB_COL_CODIGO_CORREO, u.CodigoCorreo);

            if (u.Estado == 0)
                operation.AddNullParam(DB_COL_ESTADO);
            else
                operation.AddIntParam(DB_COL_ESTADO, u.Estado);

            if (u.Tipo == 0)
                operation.AddNullParam(DB_COL_TIPO);
            else
                operation.AddIntParam(DB_COL_TIPO, u.Tipo);

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
                Tipo = GetIntValue(row, DB_COL_TIPO)
            };

            return usuario;
        }

    }
}
