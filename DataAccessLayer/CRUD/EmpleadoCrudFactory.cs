using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class EmpleadoCrudFactory : CrudFactory
    {
        EmpleadoMapper mapper;
        public EmpleadoCrudFactory(): base()
        {
            mapper = new EmpleadoMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            var sqlOperation = mapper.GetCreateStatement(empleado);
            dao.ExecuteProcedure(sqlOperation);
        }

        public List<T> RetrieveAllDatos<T>()
        {
            var lstEmpleados = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllDatosStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEmpleados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEmpleados;
        }

        public List<T> RetrieveAllDatosByComercioId<T>(int comercioId) {
            var lstEmpleados = new List<T>();
            Comercio comercio = new Comercio { Id = comercioId };

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllDatosByComercioIdStatement(comercio));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                foreach(var row in lstResult) {
                    var empleadoViewModel = new EmpleadoViewModel {
                        Id = Convert.ToInt32(row["ID"]),
                        IdUsuario = Convert.ToInt32(row["ID_USUARIO"]),
                        Cedula = row["CEDULA"].ToString(),
                        UsuarioNombre = row["USUARIO_NOMBRE"].ToString(),
                        Apellido = row["APELLIDO"].ToString(),
                        Correo = row["CORREO"].ToString(),
                        Telefono = row["TELEFONO"].ToString(),
                        IdRol = Convert.ToInt32(row["ID_ROL"]),
                        RolNombre = row["ROL_NOMBRE"].ToString(),
                        IdSucursal = Convert.ToInt32(row["ID_SUCURSAL"]),
                        SucursalNombre = row["SUCURSAL_NOMBRE"].ToString(),
                        IdComercio = Convert.ToInt32(row["ID_COMERCIO"]),
                        NombreComercio = row["NOMBRE_COMERCIO"].ToString(),
                        Estado = Convert.ToInt32(row["ESTADO"])
                    };

                    lstEmpleados.Add((T)Convert.ChangeType(empleadoViewModel, typeof(T)));
                }   
            }

            return lstEmpleados;
        }

        public T RetrieveDatosById<T>(int id_usuario)
        {
            var usuario = new Usuario { Id = id_usuario };

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveDatosByIdStatement(usuario));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var empleadoViewModel = new EmpleadoViewModel
                {
                    Id = Convert.ToInt32(dic["ID"]),
                    IdUsuario = Convert.ToInt32(dic["ID_USUARIO"]),
                    Cedula = dic["CEDULA"].ToString(),
                    UsuarioNombre = dic["NOMBRE"].ToString(),
                    Apellido = dic["APELLIDO"].ToString(),
                    Correo = dic["CORREO"].ToString(),
                    Telefono = dic["TELEFONO"].ToString(),
                    IdRol = Convert.ToInt32(dic["ID_ROL"]),
                    IdSucursal = Convert.ToInt32(dic["ID_SUCURSAL"])
                };
                
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(empleadoViewModel, typeof(T));
            }

            return default(T);
        }

        public override void Delete(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            var sqlOperation = mapper.GetDeleteStatement(empleado);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstEmpleados = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEmpleados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEmpleados;
        }

        public override void Update(BaseEntity entity)
        {
            var empleado = (Empleado)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(empleado));
        }
    }
}
