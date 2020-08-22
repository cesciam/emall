using DataAccessLayer.Dao;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Mapper
{
    public class CitaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_HORA_INICIO = "HORA_INICIO";
        private const string DB_COL_HORA_FIN = "HORA_FIN";
        private const string DB_COL_CODIGO = "CODIGO";

        //Parametro que se utiliza solamente para validar que la cita esté dentro del horario de la sucursal
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";

        //Columnas creadas para la vista UI
        private const string DB_COL_SUCURSAL = "SUCURSAL";
        private const string DB_COL_COMERCIO = "COMERCIO";
        private const string DB_COL_EMPLEADO = "EMPLEADO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_CLIENTE= "CLIENTE";

        // ID para traer empleado disponible x servicio
        private const string DB_COL_ID_ITEM = "ID_ITEM";

        //Para insertar en la tabla de item por cita
        private const string DB_COL_ID_CITA = "ID_CITA";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var cita = new Cita
            {
                id = GetIntValue(row, DB_COL_ID),
                id_cliente = GetIntValue(row, DB_COL_ID_CLIENTE),
                id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
                fecha = GetDateValue(row, DB_COL_FECHA),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin = GetDateValue(row, DB_COL_HORA_FIN),
                codigo = GetStringValue(row, DB_COL_CODIGO)
            };

            return cita;
        }

        public CitaViewModel BuildView(Dictionary<string, object> row)
        {
            var citaView = new CitaViewModel
            {
                id = GetIntValue(row, DB_COL_ID), 
                id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO),
                fecha = GetDateValue(row, DB_COL_FECHA),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin = GetDateValue(row, DB_COL_HORA_FIN),
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL),
                id_comercio = GetIntValue(row, DB_COL_ID_COMERCIO),
                nombre_comercio = GetStringValue(row, DB_COL_COMERCIO),
                nombre_empleado= GetStringValue(row, DB_COL_EMPLEADO),
                nombre_sucursal = GetStringValue(row, DB_COL_SUCURSAL)
            };

            return citaView;
        }

        public CitaEmpleViewModel BuildViewEmpleado(Dictionary<string, object> row)
        {
            var citaView = new CitaEmpleViewModel
            {
                id = GetIntValue(row, DB_COL_ID),
                fecha = GetDateValue(row, DB_COL_FECHA),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin = GetDateValue(row, DB_COL_HORA_FIN),
                nombre_cliente = GetStringValue(row, DB_COL_CLIENTE),
                id_cliente =GetIntValue(row, DB_COL_ID_CLIENTE)
                
            };

            return citaView;
        }

        public CitaComerModelView BuildViewComercio(Dictionary<string, object> row)
        {
            var citaView = new CitaComerModelView
            {
                id = GetIntValue(row, DB_COL_ID),
                fecha = GetDateValue(row, DB_COL_FECHA),
                hora_inicio = GetDateValue(row, DB_COL_HORA_INICIO),
                hora_fin = GetDateValue(row, DB_COL_HORA_FIN),
                nombre_cliente = GetStringValue(row, DB_COL_CLIENTE),
                id_cliente = GetIntValue(row, DB_COL_ID_CLIENTE),
                nombre_empleado = GetStringValue(row, DB_COL_EMPLEADO),
                id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO)

            };

            return citaView;
        }

        public BaseEntity BuildValidacion(Dictionary<string, object> row)
        {
            var cita = new Cita
            {
                id_sucursal = GetIntValue(row, DB_COL_ID_SUCURSAL)
            };

            return cita;
        }

        public int BuildIdEmpleado(Dictionary<string, object> row)
        {
            int id_empleado = GetIntValue(row, DB_COL_ID_EMPLEADO);

            return id_empleado;
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

        public SqlOperation GetCreateServiceStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "CREAR_CITA_SERVICIO" };
            var c = (Cita)entity;

            operacion.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            operacion.AddIntParam(DB_COL_ID_CLIENTE, c.id_cliente);
            operacion.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddVarcharParam(DB_COL_CODIGO, c.codigo);

            return operacion;
        }

        public SqlOperation GetCreateProductStatement(BaseEntity entity)
        {
            var operacion = new SqlOperation { ProcedureName = "CREAR_CITA_PRODUCTO" };
            var c = (Cita)entity;

            operacion.AddIntParam(DB_COL_ID_CLIENTE, c.id_cliente);
            operacion.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddVarcharParam(DB_COL_CODIGO, c.codigo);

            return operacion;
        }

        public SqlOperation GetInsertProductCitaStatement(ItemXCita itemXCita)
        {
            var operacion = new SqlOperation { ProcedureName = "INSERTAR_ITEM_CITA" };

            operacion.AddIntParam(DB_COL_ID_ITEM, itemXCita.id_item);
            operacion.AddIntParam(DB_COL_ID_CITA, itemXCita.id_cita);

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

        public SqlOperation GetCompareStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "COMPARAR_HORARIO_SUCURSAL" };

            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);


            return operacion;
        }

        public SqlOperation GetCompareCitaStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "COMPARAR_HORARIO_CITA" };

            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);


            return operacion;
        }

        public SqlOperation GetEmpleadoDisponibleStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_EMPLEADO_DISPONIBLE" };

            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);
            operacion.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            return operacion;
        }

        public SqlOperation GetEmpleadoDisponibleProdStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_EMPLEADO_DISPONIBLE_PROD" };

            operacion.AddDateParam(DB_COL_HORA_INICIO, c.hora_inicio);
            operacion.AddDateParam(DB_COL_HORA_FIN, c.hora_fin);
            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);
            operacion.AddIntParam(DB_COL_ID_ITEM, c.id_item);
            return operacion;
        }

        public SqlOperation GetCitasClienteStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CITAS_CLIENTE" };

            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_CLIENTE, c.id_cliente);

            return operacion;
        }

        public SqlOperation GetCitasEmpleadoStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CITA_EMPLEADO" };

            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_EMPLEADO, c.id_empleado);

            return operacion;
        }

        public SqlOperation GetCitasComercioStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CITA_COMERCIO" };

            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_COMERCIO, c.id_comercio);

            return operacion;
        }

        public SqlOperation GetCitasSucursalStatament(BaseEntity entity)
        {
            var c = (Cita)entity;
            var operacion = new SqlOperation { ProcedureName = "OBTENER_CITA_SUCURSAL" };

            operacion.AddDateParam(DB_COL_FECHA, c.fecha);
            operacion.AddIntParam(DB_COL_ID_SUCURSAL, c.id_sucursal);

            return operacion;
        }
    }
}
