import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroItem'
})
export class FiltroItemPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for (let item of value) {
      if (item.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado.push(item);
      }
    }

    return resultado;
  }

}
