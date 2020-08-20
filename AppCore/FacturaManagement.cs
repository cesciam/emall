using DataAccessLayer.CRUD;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class FacturaManagement
    {
        private FacturaCrudFactory facturaCrudFactory;

        public FacturaManagement()
        {
            this.facturaCrudFactory = new FacturaCrudFactory();
        }

        public Factura Create(Factura factura, Envio envio)
        {
            return facturaCrudFactory.Create(factura, envio);
        }

        public List<LineaFactura> RetrieveLineasxFactura(LineaFactura lineaFactura)
        {
            return facturaCrudFactory.RetrieveLineasxFactura<LineaFactura>(lineaFactura);
        }

        public List<Factura> RetrieveFacturasxUsuario(Factura factura)
        {
            return facturaCrudFactory.RetrieveAll<Factura>(factura);
        }
    }
}
