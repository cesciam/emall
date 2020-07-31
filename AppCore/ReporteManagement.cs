﻿using DataAccessLayer.CRUD;
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

        public List<Reporte> RetrieveAll()
        {
            return crud.RetrieveAll<Reporte>();
        }
    }
}
