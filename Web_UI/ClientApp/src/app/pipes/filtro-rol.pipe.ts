import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from '../models/rol.model';

@Pipe({
  name: 'filtroRol'
})
export class FiltroRolPipe implements PipeTransform {

  transform(value?: any, arg?: any) {
    if (value != null) {
      const resultRol = [];
      for (let rol of value) {
        if (rol.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          rol.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultRol.push(rol);
        }
      }

      return resultRol;
    }

  }

}
