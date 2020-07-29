﻿using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Crud
{
    public class ItemCrudFactory : CrudFactory
    {
        ItemMapper mapper;
        ArchivoMapper foto;

        public ItemCrudFactory() : base()
        {
            foto = new ArchivoMapper();
            mapper = new ItemMapper();
            dao = SqlDao.GetInstance();
        }


        public T RetrieveFotoItem<T>(string fotoUrl)
        {
            var archivo = new Archivo();
            archivo.Nombre = "Foto Item";
            archivo.Tipo = "Item";
            archivo.Id_Comercio = 0;
            archivo.Enlace = fotoUrl;
            var sqlOperation = foto.CrearFotoItem(archivo);
            var lista = dao.ExecuteQueryProcedure(sqlOperation);
            var dic = new Dictionary<string, object>();
            if (lista.Count > 0)
            {
                dic = lista[0];
                var objs = foto.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }
            return default(T);
        }


        public override void Create(BaseEntity entity)
        {
            var item = (Item)entity;
            var sqlOperation = mapper.GetCreateStatement(item);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lista = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lista.Count > 0)
            {
                dic = lista[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }
            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (resultados.Count > 0)
            {
                var objs = mapper.BuildObjects(resultados);

                foreach (var c in objs)
                {
                    lista.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lista;
        }

        public override void Update(BaseEntity entity)
        {
            var item = (Item)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(item));
        }

        public void UpdateArchivo(BaseEntity entity)
        {
            var archivo = (Archivo)entity;
            dao.ExecuteProcedure(foto.ModificarArchivoItem(archivo));
        }

        public override void Delete(BaseEntity entity)
        {
            var item = (Item)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(item));
        }

        public List<T> RetrieveAllBySucursal<T>(int id_sucursal)
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllBySucursal(id_sucursal));
            var dic = new Dictionary<string, object>();
            if (resultados.Count > 0)
            {
                var objs = mapper.BuildObjects(resultados);
                foreach (var c in objs)
                {
                    lista.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lista;
        }

        public List<T> RetrieveAllByTipo<T>(string tipo)
        {
            var lista = new List<T>();

            var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByTipo(tipo));
            var dic = new Dictionary<string, object>();
            if (resultados.Count > 0)
            {
                var objs = mapper.BuildObjects(resultados);
                foreach (var c in objs)
                {
                    lista.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lista;
        }

        public T RetrieveItemArchivo<T>(BaseEntity entity)
        {
            var lista = dao.ExecuteQueryProcedure(foto.ObtenerArchivoItem(entity));
            var dic = new Dictionary<string, object>();
            if (lista.Count > 0)
            {
                dic = lista[0];
                var objs = foto.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }
            return default(T);
        }


        //public List<T> RetrieveAllByComercio<T>(int id_comercio)
        //{
        //    var lista = new List<T>();

        //    var resultados = dao.ExecuteQueryProcedure(mapper.GetRetriveAllByComercio(id_comercio));
        //    var dic = new Dictionary<string, object>();
        //    if (resultados.Count > 0)
        //    {
        //        var objs = mapper.BuildObjects(resultados);
        //        foreach (var c in objs)
        //        {
        //            lista.Add((T)Convert.ChangeType(c, typeof(T)));
        //        }
        //    }

        //    return lista;
        //}
    }
}