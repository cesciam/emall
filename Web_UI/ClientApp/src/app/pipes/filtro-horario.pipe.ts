import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroHorario'
})
export class FiltroHorarioPipe implements PipeTransform {

  transform(value?: any, arg?: any) {
    if (value != null) {
      const resultHorario = [];
      for (let horario of value) {
        if (horario.tipo_horario.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultHorario.push(horario);
        }
      }

      return resultHorario;
    }

  }

}
