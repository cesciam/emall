using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using Entities.ViewModels;
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
            var envioResult = dao.ExecuteQueryProcedure(envioMapper.GetRetriveStatement(entity));
            var dictionaryList = new Dictionary<string, object>();

            if (envioResult.Count > 0)
            {
                dictionaryList = envioResult[0];
                var envio = (Envio)envioMapper.BuildObject(dictionaryList);
                envio.Items = GenerarItems(envio);

                return (T)Convert.ChangeType(envio, typeof(T));
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

        public List<T> RetrieveByUsuario<T>(int id_usuario)
        {
            var list = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(envioMapper.GetRetriveByUsuarioStatement(id_usuario));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                foreach (var c in lstResult)
                {
                    var envio = new EnvioListViewModel
                    {
                        id = Convert.ToInt32(c["ID"]),
                        estado= Convert.ToInt32(c["ESTADO"]),
                        //id_empleado= Convert.ToInt32(c["ID_EMPLEADO"]),
                        id_cliente=Convert.ToInt32(c["ID_CLIENTE"]),
                        sucursal= c["SUCURSAL"].ToString(),
                        codigo= c["CODIGO"].ToString()
                    };
                    list.Add((T)Convert.ChangeType(envio, typeof(T)));
                }
            }

            return list;
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(envioMapper.GetUpdateStatement(entity));
        }

        public void UpdateTodo(BaseEntity entity)
        {
            var h = (Envio)entity;
            dao.ExecuteProcedure(envioMapper.GetUpdateTodoStatement(h));
        }

        public Item[] GenerarItems(Envio envio)
        {
            var itemList = new List<Item>();

            var itemResult = dao.ExecuteQueryProcedure(envioMapper.GetRetriveAllStatement(envio));
            if (itemResult.Count > 0)
            {
                var items = itemMapper.BuildObjects(itemResult);
                foreach (var e in items)
                {
                    itemList.Add((Item)Convert.ChangeType(e, typeof(Item)));
                }
            }

            return itemList.ToArray();
        }
    }
}
