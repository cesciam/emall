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
            //TODO: traducir fechas y horas para poder consumirlas
            //TODO: si el usuario es cero, no llevarlo hasta la bd
            var horario = new Horario
            {
                id = h.id,
                fecha = DateTime.Parse(h.fecha+ "T00:00:00"),
                tipo_horario = h.tipo_horario,
                hora_inicio = DateTime.Parse("2020-12-12T"+h.hora_inicio+ ":00"),
                hora_fin = DateTime.Parse("2020-12-12T" + h.hora_fin + ":00"),
                id_usuario = h.id_usuario
            };
            Console.WriteLine(horario.GetEntityInformation());
            if (horario.id_usuario != -1)
            {
                crud.CreateWithUser(horario);
            }
            else
            {
                crud.Create(horario);
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
