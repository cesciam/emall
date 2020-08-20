using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.CRUD {
    public class CantonCrudFactory : CrudFactory {
        CantonMapper mapper;

        public CantonCrudFactory() {
            this.mapper = new CantonMapper();
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

        public List<T> RetrieveByProvincia<T>(int provincia) {
            var lstCanton = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(this.mapper.GetRetriveByProvinciaStatement(provincia));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstCanton.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstCanton;
        }

        public override void Update(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
