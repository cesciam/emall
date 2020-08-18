import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDireccion'
})
export class FiltroDireccionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;

    const result = [];

    for (const direccion of value) {
      if (direccion.Alias.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(direccion);
      }

      if (direccion.Detalles.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(direccion);
      }
    };

    return result;
  }
}
