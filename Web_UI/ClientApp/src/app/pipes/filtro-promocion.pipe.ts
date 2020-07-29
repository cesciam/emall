import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPromocion'
})
export class FiltroPromocionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const result = [];
    for (const promo of value) {
      if (promo.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(promo);
      } 
      if (promo.codigo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(promo);
      }
    };
    return result;
  }

}
