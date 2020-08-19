using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class TransaccionCrudFactory : CrudFactory
    {
        private TransaccionMapper transaccionMapper;

        public TransaccionCrudFactory()
        {
            this.transaccionMapper = new TransaccionMapper();
            this.dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public int CreateAndReturnId(BaseEntity entity)
        {
            int idTransaccion = (int)dao.ExecuteProcedureAndReturnId(this.transaccionMapper.GetCreateStatement(entity));
            return idTransaccion;
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
