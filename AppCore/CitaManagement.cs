using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class CitaManagement
    {
        private CitaCrudFactory crud;
        public CitaManagement()
        {
            crud = new CitaCrudFactory();
        }

        public int Create(BaseEntity entity)
        {
            var errores = ComprobarErrores(entity);

            if (errores != null)
            {
                return 0;
            }


           // crud.Create(entity);

            return 1;
        }


        public Cita Retrieve(BaseEntity entity)
        {
            return crud.Retrieve<Cita>(entity);
        }

        public List<Configuracion> RetrieveAll()
        {
            return crud.RetrieveAll<Configuracion>();
        }

        public void Delete(BaseEntity entity)
        {
            crud.Delete(entity);
        }

        public void Update(BaseEntity entity)
        {
            crud.Update(entity);
        }

        public ErrorResultViewModel ComprobarErrores(BaseEntity entity)
        {
            ErrorResultViewModel errorResult = new ErrorResultViewModel();
            errorResult.details = new List<string>();

            

            if (crud.VerificarHorario<Cita>(entity).id_sucursal < 0)
            {
                errorResult.details.Add("Cita fuera del horario de la sucursal");
            }

            if(errorResult.details.Count == 0)
            {
                return null;
            }
            else
            {
                errorResult.message = "Han ocurrido errores generales al registrar la cita";
                return errorResult;
            }
        }
    }
}
