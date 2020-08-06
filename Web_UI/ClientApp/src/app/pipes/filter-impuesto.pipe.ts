import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarImpuesto'
})
export class FilterImpuestoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultImp = [];
    for (let impuesto of value) {
      if (impuesto.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || impuesto.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultImp.push(impuesto);
      }
    }

    return resultImp;
  }

}
