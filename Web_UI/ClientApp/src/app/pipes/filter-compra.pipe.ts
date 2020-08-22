import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompra'
})
export class FilterCompraPipe implements PipeTransform {

  transform(value: any, arg?: any) {
    if (value != null) {
      const resultFactura = [];
      for (let factura of value) {
        if ((factura.idTransaccion.toString()).indexOf(arg) > -1) {
          resultFactura.push(factura);
        }
      }

      return resultFactura;
    }
  }

}
