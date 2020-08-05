import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCategoria'
})
export class FilterCategoriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCat = [];
    for (let categoria of value) {
      if (categoria.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || categoria.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultCat.push(categoria);
      }
    }

    return resultCat;
  }

}
