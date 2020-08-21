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

        public int CreateCitaServicio(BaseEntity entity)
        {
            var errores = ComprobarErrores(entity);

            if (errores != null)
            {
                return 0;
            }

            var cita = (Cita)entity;

            int id_empleado = crud.ObtenerEmpleadoDisponible(entity);

            if(id_empleado < 0)
            {
                return 0;
            }

            cita.id_empleado = id_empleado;


            crud.CreateCitaServicio(cita);

            return 1;
        }

        public int CreateCitaProducto(BaseEntity entity)
        {
            var errores = ComprobarErrores(entity);

            if (errores != null)
            {
                return 0;
            }

            var cita = (Cita)entity;

            int id_empleado = crud.ObtenerEmpleadoDisponibleProd(entity);

            if (id_empleado < 0)
            {
                return 0;
            }

            cita.id_empleado = id_empleado;


            int id_cita = crud.CreateCitaProducto<int>(cita);

            for(int i = 0; i < cita.items.Length; i++)
            {
                var itemXCita = new ItemXCita
                {
                    id_cita = id_cita,
                    id_item = cita.items[i]
                };
                crud.InsertItemCita(itemXCita);
            }

            return 1;
        }

        public List<CitaViewModel> RetrieveCitasCliente(BaseEntity entity)
        {
            return crud.ObtenerCitasCliente<CitaViewModel>(entity);
        }

        public List<CitaEmpleViewModel> RetrieveCitasEmpleado(BaseEntity entity)
        {
            return crud.ObtenerCitasEmpleado<CitaEmpleViewModel>(entity);
        }

        public List<CitaComerModelView> RetrieveCitasComercio(BaseEntity entity)
        {
            return crud.ObtenerCitasComercio<CitaComerModelView>(entity);
        }

        public List<CitaComerModelView> RetrieveCitasSucursal(BaseEntity entity)
        {
            return crud.ObtenerCitasSucursal<CitaComerModelView>(entity);
        }

        public Cita Retrieve(BaseEntity entity)
        {
            return crud.Retrieve<Cita>(entity);
        }

        public List<Cita> RetrieveAll()
        {
            return crud.RetrieveAll<Cita>();
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
                var cita = (Cita)entity;
                if(cita.id_item < 0)
                {
                    if (crud.ObtenerEmpleadoDisponibleProd(entity) < 0)
                    {
                        errorResult.details.Add("No hay empleados disponibles en este horario");
                    }
                }
                else
                {
                    if (crud.ObtenerEmpleadoDisponible(entity) < 0)
                    {
                        errorResult.details.Add("No hay empleados disponibles en este horario");
                    }
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
