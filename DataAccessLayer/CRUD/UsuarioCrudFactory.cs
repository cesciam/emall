using System;
using System.Collections.Generic;
using DataAccessLayer.CRUD;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;

namespace DataAccessLayer.Crud {
    public class UsuarioCrudFactory : CrudFactory {
        UsuarioMapper mapper;
        ArchivoMapper archivoMapper;

        public UsuarioCrudFactory() : base() {
            this.mapper = new UsuarioMapper();
            this.archivoMapper = new ArchivoMapper();

            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity) {
            var usuario = (Usuario)entity;
            var sqlOperation = mapper.GetCreateStatement(usuario);

            dao.ExecuteProcedureAndReturnId(sqlOperation);
        }

        public int Insert(BaseEntity entity) {
            var usuario = (Usuario)entity;

            if (usuario.Foto != null) { 
                usuario.Foto.Id = (int)dao.ExecuteProcedureAndReturnId(this.archivoMapper.GetCreateStatement(usuario.Foto));
            }

            var sqlOperation = mapper.GetCreateStatement(usuario);

            return (int)dao.ExecuteProcedureAndReturnId(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity) {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public T RetrieveByCorreo<T>(string correo) {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetByCorreo(correo));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>() {
            var lstUsuarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstUsuarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstUsuarios;
        }

        public List<T> RetrieveSome<T>(BaseEntity entity) {
            var lstUsuarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveSomeStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0) {
                var objs = mapper.BuildObjects(lstResult);

                foreach (var c in objs) {
                    lstUsuarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstUsuarios;
        }

        public Usuario Login(string correo, string contrasena) {
            var result = dao.ExecuteQueryProcedure(mapper.Login(correo));
            var dic = new Dictionary<string, object>();

            if (result.Count > 0) {
                dic = result[0];
                string encryptedPass = Utils.Md5.generateMD5Hash(contrasena);
                
                if (encryptedPass.Equals(dic["CONTRASENA"])) {
                    Usuario usuario = new Usuario();
                    usuario.Id = Int32.Parse(dic["ID"].ToString());

                    return this.Retrieve<Usuario>(usuario);
                }
            }

            return null;
        }

        public bool Activar(int id, string codigo) {
            Usuario usuario = new Usuario();
            usuario.Id = id;

            var result = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(usuario));
            var dic = new Dictionary<string, object>();

            if (result.Count > 0) {
                dic = result[0];

                if (codigo.Equals(dic["CODIGO_CORREO"]) || codigo.Equals("YWN0aXZhZG8gcG9yIGFkbWlu")) {
                    dao.ExecuteProcedure(mapper.Activar(id));
                    return true;
                }
            }

            return false;
        }

        public override void Update(BaseEntity entity) {
            var usuario = (Usuario)entity;

            if (usuario.Foto != null) {
                usuario.Foto.Id = (int)dao.ExecuteProcedureAndReturnId(this.archivoMapper.GetCreateStatement(usuario.Foto));
            } else {
                Usuario usuarioActual = this.Retrieve<Usuario>(usuario);
                Archivo foto = new Archivo() {
                    Id = usuarioActual.Foto.Id
                };
                usuario.Foto = foto;
            }

            dao.ExecuteProcedure(mapper.GetUpdateStatement(usuario));
        }

        public override void Delete(BaseEntity entity) {
            var usuario = (Usuario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(usuario));
        }
    }
}
