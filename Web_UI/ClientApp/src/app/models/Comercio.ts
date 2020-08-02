import { Archivo } from "./Archivo";
import { Categoria } from "./categoria.model";

export class Comercio {
  id: number;
  idAdmin: number;
  nombre: string;
  nombreLegal: string;
  cedulaJuridica: string;
  archivos: Archivo[];
  categorias: string[];
  estado: number;

}
