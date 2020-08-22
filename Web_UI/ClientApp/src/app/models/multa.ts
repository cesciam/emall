import { Usuario } from "./usuario.model";
import { Item } from "./item";
import { Comercio } from "./Comercio";
import { Sucursal } from "./Sucursal";

export class Multa {
  id: number;
  id_usuario: number;
  id_item: number;
  id_comercio: number;
  id_sucursal: number;
  fecha: Date;
  usuario: Usuario;
  item: Item;
  comercio: Comercio;
  sucursal: Sucursal;
}
