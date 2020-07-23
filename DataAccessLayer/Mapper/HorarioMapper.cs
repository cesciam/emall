using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class HorarioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "id";
        private const string DB_COL_FECHA = "fecha";
        private const string DB_COL_TIPO_HORARIO = "tipo_horario";
        private const string DB_COL_HORA_INICIO = "hora_inicio";
        private const string DB_COL_HORA_FIN = "hora_fin";
        private const string DB_COL_ID_USUARIO = "id_usuario";
        
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var horario = new Horario
            {
                id = GetIntValue(row, DB_COL_ID),
                fecha = GetDateValue(row, DB_COL_FECHA),
                tipo_horario = GetStringValue(row, DB_COL_TIPO_HORARIO),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin = GetDateValue(row, DB_COL_HORA_FIN),
                id_usuario = GetIntValue(row, DB_COL_ID_USUARIO)
            };
            return horario;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var h = BuildObject(row);
                lstResults.Add(h);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CREAR_HORARIO_PR" };
            var h = (Horario)entity;
            operation.AddDateParam(DB_COL_FECHA, h.fecha);
            operation.AddVarcharParam(DB_COL_TIPO_HORARIO, h.tipo_horario);
            operation.AddDateParam(DB_COL_HORA_INICIO, h.hora_inicio);
            operation.AddDateParam(DB_COL_HORA_FIN, h.hora_fin);
            operation.AddIntParam(DB_COL_ID_USUARIO, h.id_usuario);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ELIMINAR_HORARIO_PR" };
            var h = (Horario)entity;
            operation.AddIntParam(DB_COL_ID, h.id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_TODO_HORARIO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "OBTENER_HORARIO_PR" };
            var h = (Horario)entity;
            operation.AddIntParam(DB_COL_ID, h.id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "MODIFICAR_HORARIO_PR" };
            var h = (Horario)entity;
            operation.AddIntParam(DB_COL_ID, h.id);
            operation.AddDateParam(DB_COL_FECHA, h.fecha);
            operation.AddVarcharParam(DB_COL_TIPO_HORARIO, h.tipo_horario);
            operation.AddDateParam(DB_COL_HORA_INICIO, h.hora_inicio);
            operation.AddDateParam(DB_COL_HORA_FIN, h.hora_fin);
            operation.AddIntParam(DB_COL_ID_USUARIO, h.id_usuario);
            return operation;
        }
    }
}
