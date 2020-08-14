import { Item } from '../models/item'

export class Envio {
  id: number;
  estado: number;
  idEmpleado: number;
  idCliente: number;
  items: Item[];
}
