import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterComercio'
})
export class FilterComercioPipe implements PipeTransform {

  transform(value?: any, arg?: any){
    if (value != null) {
      const resultComercio = [];
      for (let comercio of value) {
        if (comercio.nombreLegal.toLowerCase().indexOf(arg.toLowerCase()) > -1 || comercio.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultComercio.push(comercio);
        }
      }

      return resultComercio;
    }
  }
}
