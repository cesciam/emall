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
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
