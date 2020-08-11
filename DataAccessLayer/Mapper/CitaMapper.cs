﻿using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class CitaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ITEM = "ID_ITEM";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_HORA_INICIO = "HORA_INICIO";
        private const string DB_COL_HORA_FIN = "HORA_FIN";
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var cita = new Cita
            {
                id = GetIntValue(row, DB_COL_ID),
                id_item = GetIntValue(row, DB_COL_ID_ITEM),
                id_cliente = GetIntValue(row, DB_COL_ID_CLIENTE),
                id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
                fecha= GetDateValue(row, DB_COL_FECHA),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin= GetDateValue(row, DB_COL_HORA_FIN)
            };

            return cita;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var cita = BuildObject(row);
                lstResult.Add(cita);
            }

            return lstResult;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "CREAR_CITA" };
            var c = (Cita)entity;

            operacion.AddIntParam(DB_COL_ID_CLIENTE, c.id_cliente);
            operacion.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operacion.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);

            return operacion;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "ELIMINAR_CITA" };

            var c = (Cita)entity;
            operacion.AddIntParam(DB_COL_ID, c.id);
            return operacion;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_TODO_CITA" };

            return operacion;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CITA" };

            var c = (Cita)entity;
            operacion.AddIntParam(DB_COL_ID, c.id);

            return operacion;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "MODIFICAR_CITA" };

            var c = (Cita)entity;

            operacion.AddIntParam(DB_COL_ID, c.id);
            operacion.AddIntParam(DB_COL_ID_CLIENTE, c.id_cliente);
            operacion.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operacion.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);

            return operacion;
        }
    }
}
