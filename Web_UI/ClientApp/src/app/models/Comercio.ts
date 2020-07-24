import { Archivo } from "./Archivo";
import { Categoria } from "./Categoria";

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
