using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class VistaXRolMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_VISTA = "ID_VISTA";
        private const string DB_COL_ID_ROL = "ID_ROL";
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var vr = new VistaXRol
            {
                id = GetIntValue(row, DB_COL_ID),
                id_vista = GetIntValue(row, DB_COL_ID_VISTA),
                id_rol = GetIntValue(row, DB_COL_ID_ROL)
            };
            return vr;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var vr = BuildObject(row);
                lstResults.Add(vr);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_VISTAXROL_PR" };
            var vr = (VistaXRol)entity;
            operation.AddIntParam(DB_COL_ID_VISTA, vr.id_vista);
            operation.AddIntParam(DB_COL_ID_ROL, vr.id_rol);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_VISTAXROL_PR" };
            var vr = (VistaXRol)entity;
            operation.AddIntParam(DB_COL_ID, vr.id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_VISTAXROL_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_VISTAXROL_PR" };
            var vr = (VistaXRol)entity;
            operation.AddIntParam(DB_COL_ID, vr.id);
            return operation;
        }

        public SqlOperation GetRetriveByRol(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_VISTAXROL_ROL_PR" };
            var vr = (VistaXRol)entity;
            operation.AddIntParam(DB_COL_ID_ROL, vr.id_rol);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_VISTAXROL_PR" };
            var vr = (VistaXRol)entity;
            operation.AddIntParam(DB_COL_ID, vr.id);
            operation.AddIntParam(DB_COL_ID_VISTA, vr.id_vista);
            operation.AddIntParam(DB_COL_ID_ROL, vr.id_rol);
            return operation;
        }
    }
}
