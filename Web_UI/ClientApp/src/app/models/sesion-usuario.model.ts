export interface SesionUsuario {
  Id: number;
  Cedula: string; 
  Nombre: string; 
  Apellido: string; 
  Correo: string; 
  Foto: number; 
  Telefono: string; 
  TelefonoConfirmado: number; 
  CorreoConfirmado: number; 
  CodigoCorreo: number; 
  CodigoTelefono: number; 
  Estado: number; 
  Tipo: number;
  Token: string;
}
