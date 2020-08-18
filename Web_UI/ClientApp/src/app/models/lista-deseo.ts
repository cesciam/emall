import { Usuario } from "./usuario.model";
import { Item } from "./item";

export class ListaDeseo {
  id: number;
  id_item: number;
  id_usuario: number;
  usuario: Usuario;
  items: Array<Item>;
}
