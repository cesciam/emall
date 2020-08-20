using DataAccessLayer.Crud;
using DataAccessLayer.CRUD;
using Entities;
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
        private ItemCrudFactory crudItem;
        private UsuarioCrudFactory crudUsuario;
        private ComercioCrudFactory crudComercio;
        private SucursalCrudFactory crudSucursal;

        public MultaManagement()
        {
            crudMulta = new MultaCrudFactory();
            crudItem = new ItemCrudFactory();
            crudUsuario = new UsuarioCrudFactory();
            crudComercio = new ComercioCrudFactory();
            crudSucursal = new SucursalCrudFactory();
            crudConfig = new ConfiguracionCrudFactory();
        }



        public void CreateMulta(Multa multa)
        {
            var validarmulta = new Configuracion();
            validarmulta.codigo = "cancelacion_cita";

            validarmulta = crudConfig.Retrieve<Configuracion>(validarmulta);
            DateTime hoy = DateTime.Now;

            int diferencia = (hoy - multa.fecha).Days;
            if (diferencia < validarmulta.valor)
            {
                crudMulta.Create(multa);
            }

        }

        public List<Multa> ObtenerMultasUsuario(int id_usuario)
        {
            return crudMulta.RetrieveAllByUser<Multa>(id_usuario);
        }

        public void DeleteMulta(Multa multa)
        {
            crudMulta.Delete(multa);
        }

    }
}
