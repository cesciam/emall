import { LineaFactura } from '../models/lineafactura.model';
export class Factura {
  id: number;
  fecha: Date;
  idUsuario: number;
  idEmpleado: number;
  nombreEmpleado: string;
  apellidoEmpleado: string;
  cedulaUsuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  telefonoUsuario: string;
  correoUsuario: string;
  nombreProvincia: string;
  nombreCanton: string;
  nombreDistrito: string;
  detallesDireccion: string;
  nombreSucursal: string;
  cedulaJuridica: string;
  idTransaccion: number;
  idPromocion: number;
  nombrePromocion: string;
  porcentaje: number;
  lineas: LineaFactura[];

}
