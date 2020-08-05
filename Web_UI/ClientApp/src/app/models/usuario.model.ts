import { Archivo } from "./Archivo";

export class Usuario {
  Id: string;
  Cedula: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
  Contrasena: string;
  Foto: Archivo;
  Telefono: string;
  TelefonoConfirmado: number;
  CorreoConfirmado: number;
  CodigoCorreo: string;
  CodigoTelefono: string;
  Estado: number;
  Tipo: number;
}
