using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private ReporteManagement mng = new ReporteManagement();
        [HttpGet]
        public List<Reporte> comercioPorCategoria()
        {
            return mng.RetrieveCategoriaPorComercio();
        }

        [HttpGet]
        public List<Reporte> empleadoPorCategoria()
        {
            return mng.RetrieveEmpleadoPorComercio();
        }

        [HttpGet]
        public List<Reporte> usuarioPorTipo()
        {
            return mng.RetrieveUsuarioPorTipo();
        }
        [HttpGet]
        public List<Reporte> usuarioPorEstado()
        {
            return mng.RetrieveUsuarioPorEstado();
        }

        [HttpGet]
        public List<Reporte> ventas()
        {
            return mng.RetrieveVentas(); 
        }

        [HttpGet]
        public List<Reporte> transacciones()
        {
            return mng.RetrieveTransacciones();
        }

        [HttpGet]
        public List<Reporte> citas()
        {
            return mng.RetrieveCitas();
        }

        [HttpGet]
        public List<Reporte> metodosPago()
        {
            return mng.RetrieveMetodosPago();
        }
    }
}
