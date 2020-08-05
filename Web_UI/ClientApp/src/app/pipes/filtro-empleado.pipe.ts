import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleado'
})
export class FiltroEmpleadoPipe implements PipeTransform {

  transform(value?: any, arg?: any) {
    if (value != null) {
      const resultEmpleado = [];
      for (let empleado of value) {
        if (empleado.UsuarioNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          empleado.Correo.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          empleado.RolNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          empleado.SucursalNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultEmpleado.push(empleado);
        }
      }

      return resultEmpleado;
    }
  }

}
