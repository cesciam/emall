using DataAccessLayer.Dao;
using Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper {
    public class UsuarioMapper : EntityMapper, ISqlStaments, IObjectMapper {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CEDULA = "CEDULA";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_APELLIDOS = "APELLIDOS";
        private const string DB_COL_CORREO = "CORREO";
        private const string DB_COL_ID_FOTO = "ID_FOTO";
        private const string DB_COL_TELEFONO = "TELEFONO";
        private const string DB_COL_TELEFONO_CONFIRMADO = "TELEFONO_CONFIRMADO";
        private const string DB_COL_CORREO_CONFIRMADO = "CORREO_CONFIRMADO";
        private const string DB_COL_CODIGO_CORREO = "CODIGO_CORREO";
        private const string DB_COL_CODIGO_TELEFONO = "CODIGO_TELEFONO";
        private const string DB_COL_ESTADO = "ESTADO";

        public SqlOperation GetCreateStatement(BaseEntity entity) {
            var operation = new SqlOperation { ProcedureName = "CREAR_USUARIO" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID, u.Id);
            operation.AddVarcharParam(DB_COL_CEDULA, u.Cedula);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDOS, u.Apellidos);
            operation.AddVarcharParam(DB_COL_CORREO, u.Correo);
            operation.AddIntParam(DB_COL_ID_FOTO, u.Foto);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddIntParam(DB_COL_TELEFONO_CONFIRMADO, u.TelefonoConfirmado);
            operation.AddIntParam(DB_COL_CORREO_CONFIRMADO, u.CorreoConfirmado);
            operation.AddVarcharParam(DB_COL_CODIGO_CORREO, u.CodigoCorreo);
            operation.AddVarcharParam(DB_COL_CODIGO_TELEFONO, u.CodigoTelefono);
            operation.AddIntParam(DB_COL_ESTADO, u.Estado);

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
            operation.AddVarcharParam(DB_COL_APELLIDOS, u.Apellidos);
            operation.AddVarcharParam(DB_COL_CORREO, u.Correo);
            operation.AddIntParam(DB_COL_ID_FOTO, u.Foto);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddIntParam(DB_COL_TELEFONO_CONFIRMADO, u.TelefonoConfirmado);
            operation.AddIntParam(DB_COL_CORREO_CONFIRMADO, u.CorreoConfirmado);
            operation.AddVarcharParam(DB_COL_CODIGO_CORREO, u.CodigoCorreo);
            operation.AddVarcharParam(DB_COL_CODIGO_TELEFONO, u.CodigoTelefono);
            operation.AddIntParam(DB_COL_ESTADO, u.Estado);

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
                Apellidos = GetStringValue(row, DB_COL_APELLIDOS),
                Correo = GetStringValue(row, DB_COL_CORREO),
                Foto = GetIntValue(row, DB_COL_ID_FOTO),
                Telefono = GetStringValue(row, DB_COL_TELEFONO),
                TelefonoConfirmado = GetIntValue(row, DB_COL_TELEFONO_CONFIRMADO),
                CorreoConfirmado = GetIntValue(row, DB_COL_CORREO_CONFIRMADO),
                CodigoCorreo = GetStringValue(row, DB_COL_CODIGO_CORREO),
                CodigoTelefono = GetStringValue(row, DB_COL_CODIGO_TELEFONO),
                Estado = GetIntValue(row, DB_COL_ESTADO)
            };

            return usuario;
        }

    }
}
