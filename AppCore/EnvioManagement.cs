using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Entities.ViewModels;
using System.Linq;

namespace AppCore
{
    public class EnvioManagement
    {
        EnvioCrudFactory envioCrudFactory;

        public EnvioManagement()
        {
            this.envioCrudFactory = new EnvioCrudFactory();
        }

        public void Create(Envio envio)
        {
            this.envioCrudFactory.Create(envio);
        }

        public List<Envio> RetrieveBySucursal(int id_sucursal)
        {
            return envioCrudFactory.RetrieveBySucursal<Envio>(id_sucursal);
        }

        public Envio RetrieveById(int id)
        {
            var im = new ItemManagement();
            var envio = new Envio { Id = id };
            var retorno = envioCrudFactory.Retrieve<Envio>(envio);

            retorno.Items = im.RetrieveByEnvio(retorno.Id).ToArray();
            

            return retorno;
        }

        public List<EnvioListViewModel> RetrieveEnvioListBySucursal(int id_sucursal)
        {
            var envios = envioCrudFactory.RetrieveBySucursal<Envio>(id_sucursal);

            var dm = new DireccionManagement();
            var um = new UsuarioManagement();
            var em = new EmpleadoManagement();

            var lstEnviosList = new List<EnvioListViewModel>();
            if(envios.Count > 0)
            {
                foreach(var envio in envios)
                {
                    var envioList = new EnvioListViewModel();
                    var direccion = dm.RetrieveActivaByUserId(envio.IdCliente);
                    var usuario = new Usuario { Id = envio.IdCliente };
                    var cliente = um.RetrieveById(usuario);

                    if (envio.IdEmpleado != -1)
                    {
                        var usuarioE = new Empleado { id = envio.IdEmpleado };
                        var empleado = em.RetrieveByIdViewModel(usuarioE);
                        envioList.id_empleado = envio.IdEmpleado;
                        envioList.nombre_empleado = empleado.UsuarioNombre + " " + empleado.Apellido;
                    }

                    if(direccion != null)
                    {
                        envioList.latitud = direccion.Latitud;
                        envioList.longitud = direccion.Longitud;
                    }
                    envioList.id = envio.Id;
                    envioList.id_cliente = envio.IdCliente;
                    envioList.nombre_cliente = cliente.Nombre +" "+ cliente.Apellido;
                    
                    envioList.estado = envio.Estado;
                    envioList.codigo = "falta backend";

                    lstEnviosList.Add(envioList);
                }
            }

            return lstEnviosList;
        }

        public EnvioListViewModel RetrieveEnvioListByid(int id)
        {
            var e = new Envio { Id = id };
            var envio = envioCrudFactory.Retrieve<Envio>(e);

            var dm = new DireccionManagement();
            var um = new UsuarioManagement();
            var em = new EmpleadoManagement();
            var envioList = new EnvioListViewModel();
            var lstEnviosList = new List<EnvioListViewModel>();
            if (envio!= null)
            {
                    var direccion = dm.RetrieveActivaByUserId(envio.IdCliente);
                    var usuario = new Usuario { Id = envio.IdCliente };
                    var cliente = um.RetrieveById(usuario);

                    if (envio.IdEmpleado != -1)
                    {
                        var usuarioE = new Empleado { id = envio.IdEmpleado };
                        var empleado = em.RetrieveByIdViewModel(usuarioE);
                        envioList.id_empleado = envio.IdEmpleado;
                        envioList.nombre_empleado = empleado.UsuarioNombre + " " + empleado.Apellido;
                    }

                    if (direccion != null)
                    {
                        envioList.latitud = direccion.Latitud;
                        envioList.longitud = direccion.Longitud;
                    }
                    envioList.id = envio.Id;
                    envioList.id_cliente = envio.IdCliente;
                    envioList.nombre_cliente = cliente.Nombre + " " + cliente.Apellido;

                    envioList.estado = envio.Estado;
                    envioList.codigo = "falta backend";

                    lstEnviosList.Add(envioList);
                
            }

            return envioList;
        }
    }
}
