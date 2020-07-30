import { Archivo } from "./Archivo";

export class RegistroUsuario {
  Cedula: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
  Contrasena: string;
  Telefono: string;
  Tipo: number;
  Foto: Archivo;
}
