import { Archivo } from "./Archivo";

export interface Usuario {
  Id: string;
  Cedula: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
  Foto: string;
  Telefono: string;
  TelefonoConfirmado: number;
  CorreoConfirmado: number;
  CodigoCorreo: string;
  CodigoTelefono: string;
  Estado: number;
  Tipo: number;
}
