﻿using DataAccessLayer.Crud;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.CRUD
{
    public class FacturaCrudFactory : CrudFactory
    {
        private FacturaMapper facturaMapper;
        private LineaFacturaMapper lineaFacturaMapper;
        private ImpuestoCrudFactory impuestoCrudFactory;
        private ItemCrudFactory itemCrudFactory;

        public FacturaCrudFactory()
        {
            this.facturaMapper = new FacturaMapper();
            this.lineaFacturaMapper = new LineaFacturaMapper();
            this.impuestoCrudFactory = new ImpuestoCrudFactory();
            this.itemCrudFactory = new ItemCrudFactory();
            this.dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public Factura Create(Factura factura, Envio envio)
        {
            var facturaResult = dao.ExecuteQueryProcedure(facturaMapper.GetCreateStatement(factura));
            var dictionaryList = new Dictionary<string, object>();

            var facturaDB = new Factura();

            if (facturaResult.Count > 0)
            {
                dictionaryList = facturaResult[0];
                facturaDB = (Factura)facturaMapper.BuildObject(dictionaryList);
            }
            
            var impuesto = new Impuesto();

            var lineaFactura = new LineaFactura();
            lineaFactura.IdFactura = facturaDB.Id;

            foreach (var item in envio.Items)
            {
                lineaFactura.IdItem = item.id;
                lineaFactura.NombreItem = item.nombre;
                lineaFactura.CantidadItem = 1;
                lineaFactura.PrecioItem = item.precio;

                impuesto.Id = item.id_impuesto;
                impuesto = itemCrudFactory.ImpuestoItem<Impuesto>(impuesto);

                lineaFactura.Impuesto = impuesto.Porcentaje;

                dao.ExecuteProcedure(lineaFacturaMapper.GetCreateStatement(lineaFactura));
            }

            return facturaDB;
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
