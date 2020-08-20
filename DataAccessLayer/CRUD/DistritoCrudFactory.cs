using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.CRUD {
    public class DistritoCrudFactory : CrudFactory {
        DistritoMapper mapper;

        public DistritoCrudFactory() {
            this.mapper = new DistritoMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public override void Delete(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public override T Retrieve<T>(BaseEntity entity) {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>() {
            throw new NotImplementedException();
        }

        public List<T> RetrieveByProvinciaCanton<T>(int provincia, int canton) {
            var lstDistrito = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(this.mapper.GetRetriveByProvinciaCantonStatement(provincia, canton));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstDistrito.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstDistrito;
        }

        public override void Update(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
