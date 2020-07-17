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
    public class PromocionController : ControllerBase
    {
        private PromocionManagement mng = new PromocionManagement();
        
        [HttpPost]
        public IActionResult Create (Promocion p)
        {
            try
            {
                mng.Create(p);

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        public List<Promocion> RetrieveAll()
        {
            return mng.RetrieveAll();
        }

        [HttpGet]
        public List<Promocion> RetrieveAllByComercio(int id_comercio)
        {
            var promocion = new Promocion
            {
                id_comercio = id_comercio
            };

            return mng.RetrieveAllByComercio(promocion);
        }

        [HttpGet]
        public List<Promocion> RetrieveAllBySucursal(int id_sucursal)
        {
            var promocion = new Promocion
            {
                id_sucursal = id_sucursal
            };

            return mng.RetrieveAllBySucursal(promocion);
        }

        [HttpGet]
        public List<Promocion> RetrieveAllByApp()
        {
            return mng.RetrieveAllByApp();
        }

        [HttpPut]
        public IActionResult Update(Promocion p)
        {
            try
            {
                mng.Update(p);

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                Promocion p = new Promocion
                {
                    id = id
                };
                mng.Delete(p);

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
