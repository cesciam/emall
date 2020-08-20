﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.CRUD {
    public class ProvinciaCrudFactory : CrudFactory {
        ProvinciaMapper mapper;

        public ProvinciaCrudFactory() {
            this.mapper = new ProvinciaMapper();
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
            var lstProvincias = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(this.mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstProvincias.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstProvincias;
        }

        public override void Update(BaseEntity entity) {
            throw new NotImplementedException();
        }
    }
}
