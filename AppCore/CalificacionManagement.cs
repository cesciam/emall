using DataAccessLayer.Crud;
using DataAccessLayer.CRUD;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;
using Utils;
using Utils.Email;
using Microsoft.Extensions.Configuration;

namespace AppCore {
    public class CalificacionManagement {
        private CalificacionCrudFactory crudCalificacion;

        public CalificacionManagement() {
            this.crudCalificacion = new CalificacionCrudFactory();
        }

        public void Create(Calificacion calificacion) {
            if (calificacion.ItemId != 0) {
                Calificacion cItem = this.Retrieve(calificacion);

                if (cItem != null) {
                    calificacion.Id = cItem.Id;
                    this.Update(calificacion);
                } else {
                    this.crudCalificacion.Create(calificacion);
                }
            } else if (calificacion.ComercioId != 0) {
                Calificacion cComercio = this.Retrieve(calificacion);

                if (cComercio != null) {
                    calificacion.Id = cComercio.Id;
                    this.Update(calificacion);
                } else {
                    this.crudCalificacion.Create(calificacion);
                }
            } else {
                this.crudCalificacion.Create(calificacion);
            }
        }

        public List<Calificacion> RetrieveAll() {
            List<Calificacion> calificaciones = crudCalificacion.RetrieveAll<Calificacion>();

            return calificaciones;
        }

        public Calificacion RetrieveByComercioId(int comercioId) {
            Calificacion calificacion = new Calificacion {
                ComercioId = comercioId
            };

            Calificacion result = this.crudCalificacion.RetrieveByComercio<Calificacion>(calificacion);

            return result;
        }

        public Calificacion Retrieve(Calificacion calificacion) {
            Calificacion result = this.crudCalificacion.Retrieve<Calificacion>(calificacion);

            return result;
        }

        public Calificacion RetrieveByItemId(int itemId) {
            Calificacion calificacion = new Calificacion {
                ItemId = itemId
            };

            Calificacion result = this.crudCalificacion.RetrieveByItem<Calificacion>(calificacion);

            return result;
        }

        public void Update(Calificacion calificacion) {
            this.crudCalificacion.Update(calificacion);
        }
    }
}
