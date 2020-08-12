using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class HorarioManagement
    {
        private HorarioCrudFactory crud;
        public HorarioManagement()
        {
            crud = new HorarioCrudFactory();
        }
        public void Create(HorarioViewModel h)
        {
            var horario = new Horario
            {
                id = h.id,
                fecha = DateTime.Parse(h.fecha+ "T00:00:00"),
                tipo_horario = h.tipo_horario,
                hora_inicio = DateTime.Parse("2020-12-12T"+h.hora_inicio+ ":00"),
                hora_fin = DateTime.Parse("2020-12-12T" + h.hora_fin + ":00"),
                id_usuario = h.id_usuario,
                id_sucursal = h.id_sucursal
            };
            Console.WriteLine(horario.GetEntityInformation());
            if (horario.id_usuario == -1)
            {
                crud.Create(horario);
            }
            else
            {
                crud.CreateWithUser(horario);
            }
            
        }
        public List<Horario> RetrieveAll()
        {
            return crud.RetrieveAll<Horario>();
        }
        public Horario RetrieveById(Horario h)
        {
            return crud.Retrieve<Horario>(h);
        }
        public List<Horario> RetrieveBySucursal(Horario h)
        {
            return crud.RetrieveBySucursal<Horario>(h);
        }
        public void Update(Horario h)
        {
            crud.Update(h);
        }
        public void Delete(Horario h)
        {
            crud.Delete(h);
        }
    }
}
