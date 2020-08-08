import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;

    const result = [];

    for (const usuario of value) {
      if (usuario.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(usuario);
      }

      if (usuario.Apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(usuario);
      }

      if (usuario.Cedula.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(usuario);
      }

      if (usuario.Correo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(usuario);
      }

      if (usuario.Telefono.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(usuario);
      }
    };

    return result;
  }
}
