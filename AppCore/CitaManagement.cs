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

            var cita = (Cita)entity;
            cita.id_empleado = crud.ObtenerEmpleadoDisponible(entity);


            crud.Create(cita);

            return 1;
        }

        public List<CitaViewModel> RetrieveCitasCliente(BaseEntity entity)
        {
            return crud.ObtenerCitasCliente<CitaViewModel>(entity);

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
            var citaError = crud.VerificarHorario<Cita>(entity);


            if (citaError != null)
            {
                if (citaError.id_sucursal < 0)
                {
                    errorResult.details.Add("Cita fuera del horario de la sucursal");
                }
            }
            

            if (crud.VerificarCita(entity))
            {
                if (crud.ObtenerEmpleadoDisponible(entity) < 0)
                {
                    errorResult.details.Add("No hay empleados disponibles en este horario");
                }
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
