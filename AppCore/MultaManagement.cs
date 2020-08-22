﻿using DataAccessLayer.Crud;
using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Security;

namespace AppCore
{
    public class MultaManagement
    {

        private MultaCrudFactory crudMulta;
        private ConfiguracionCrudFactory crudConfig;
        private ComercioCrudFactory crudComercio;
        private SucursalCrudFactory crudSucursal;
        private EmpleadoCrudFactory crudEmpleado;

        public MultaManagement()
        {
            crudMulta = new MultaCrudFactory();
            crudComercio = new ComercioCrudFactory();
            crudSucursal = new SucursalCrudFactory();
            crudConfig = new ConfiguracionCrudFactory();
            crudEmpleado = new EmpleadoCrudFactory();
        }



        public void CreateMulta(Multa multa)
        {
            var validarmulta = new Configuracion();
            validarmulta.codigo = "cancelacion_cita";

            validarmulta = crudConfig.Retrieve<Configuracion>(validarmulta);
            DateTime hoy = DateTime.Now;

            int diferencia = (multa.fecha - hoy).Days;
            if (diferencia < validarmulta.valor)
            {

                var tmp = new List<EmpleadoViewModel>();

                tmp = crudEmpleado.RetrieveAllDatosByComercioId<EmpleadoViewModel>(multa.id_comercio);
                multa.id_item = tmp[0].Id;

                crudMulta.Create(multa);
            }

        }

        public List<Multa> ObtenerMultasUsuario(int id_usuario)
        {
            var multas = crudMulta.RetrieveAllByUser<Multa>(id_usuario);

            for (int i = 0; i < multas.Count; i++)
            {
                multas[i].comercio = new Comercio();
                multas[i].comercio.Id = multas[i].id_comercio;
                multas[i].comercio = crudComercio.Retrieve<Comercio>(multas[i].comercio);

                multas[i].sucursal = new Sucursal();
                multas[i].sucursal.Id = multas[i].id_sucursal;
                multas[i].sucursal = crudSucursal.Retrieve<Sucursal>(multas[i].sucursal);

            }

            return multas;
        }

        public void DeleteMulta(Multa multa)
        {
            crudMulta.Delete(multa);
        }

    }
}
