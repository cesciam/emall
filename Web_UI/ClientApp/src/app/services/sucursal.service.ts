import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sucursal } from '../models/Sucursal';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private http: HttpClient;
  private BASE_URL: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  registrarSucursal(sucursal: Sucursal) {
    let endpoint = this.BASE_URL + '/sucursal/crearsucursal';

    return this.http.post<Sucursal>(endpoint, sucursal)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  obtenerSucursal(idSucursal: number) {
    let endpointUrl = this.BASE_URL + '/sucursal/obtenersucursal?id=' + idSucursal;
    return this.http.get<Sucursal>(endpointUrl);
  }

  obtenerSucursalPorEmpleado(idUsuario: number) {
    let endpointUrl = this.BASE_URL + '/sucursal/ObtenerSucursalPorEmpleado?id=' + idUsuario;
    return this.http.get<Sucursal>(endpointUrl);
  }

   ObtenerTodoSucursales(id : number) {
    let endpointUrl = this.BASE_URL + '/sucursal/obtenertodosucursal?idComercio=' + id;

    return this.http.get<Sucursal[]>(endpointUrl);
  }

  modificarSucursal(sucursal: Sucursal) {
    let endpointUrl = this.BASE_URL + '/sucursal/modificarsucursal';

    return this.http.put<Sucursal>(endpointUrl, sucursal)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  eliminarSucursal(id: number) {
    let endpoint = this.BASE_URL + '/sucursal/eliminarsucursal?id=' + id;
    return this.http.delete(endpoint)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  } 
}
