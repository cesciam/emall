import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEnvio'
})
export class FiltroEnvioPipe implements PipeTransform {

  transform(value?: any, arg?: any) {
    if (value != null) {
      const result = [];
      for (let envio of value) {
        if (envio.nombre_cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          result.push(envio);
        }
      }

      return result;
    }

  }

}
