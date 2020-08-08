import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSucursal'
})
export class FilterSucursalPipe implements PipeTransform {

  transform(value?: any, arg?: any){
    if(value!=null){
      const resultSucursal = [];
    for (let sucursal of value) {
      if (sucursal.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultSucursal.push(sucursal);
      }
    }

    return resultSucursal;
  }
    }
    

}
