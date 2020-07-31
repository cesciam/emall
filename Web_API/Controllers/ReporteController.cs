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

    }
}
