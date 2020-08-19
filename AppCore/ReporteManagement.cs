using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class ReporteManagement
    {
        private ReporteCrudFactory crud;

        public ReporteManagement()
        {
            crud = new ReporteCrudFactory();
        }

        public List<Reporte> RetrieveCategoriaPorComercio()
        {
            return crud.RetrieveCategoriaPorComercio<Reporte>();
        }
        public List<Reporte> RetrieveEmpleadoPorComercio()
        {
            return crud.RetrieveEmpleadoPorComercio<Reporte>();
        }

        public List<Reporte> RetrieveUsuarioPorTipo()
        {
            return crud.RetrieveUusuarioPorTipo<Reporte>();
        }

        public List<Reporte> RetrieveUsuarioPorEstado()
        {
            return crud.RetrieveUusuarioPorEstado<Reporte>();
        }

        public List<Reporte> RetrieveVentas()
        {
            return crud.RetrieveVentas<Reporte>();
        }

        public List<Reporte> RetrieveTransacciones()
        {
            return crud.RetrieveTransacciones<Reporte>();
        }

        public List<Reporte> RetrieveCitas()
        {
            return crud.RetrieveCitas<Reporte>();
        }

        public List<Reporte> RetrieveMetodosPago()
        {
            return crud.RetrieveMetodosPago<Reporte>();
        }
    }
}
