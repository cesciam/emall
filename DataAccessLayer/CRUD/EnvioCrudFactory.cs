using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class EnvioCrudFactory : CrudFactory
    {
        EnvioMapper envioMapper;
        ItemMapper itemMapper;

        public EnvioCrudFactory()
        {
            this.envioMapper = new EnvioMapper();
            this.itemMapper = new ItemMapper();
            this.dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            int idEnvio = (int)dao.ExecuteProcedureAndReturnId(this.envioMapper.GetCreateStatement(entity));
            var itemxEnvio = new ItemxEnvio { IdEnvio = idEnvio };

            var envio = (Envio)entity;

            foreach (var item in envio.Items)
            {
                itemxEnvio.IdItem = item.id;
                dao.ExecuteProcedure(envioMapper.CreateItemxEnvioStatement(itemxEnvio));
                dao.ExecuteProcedure(itemMapper.GetUpdateInventarioStatement(item));
            }

        }

        public override void Delete(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(envioMapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = envioMapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        


        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveBySucursal<T>(int id_sucursal)
        {
            var list = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(envioMapper.GetRetriveBySucursalStatement(id_sucursal));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = envioMapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return list;
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
