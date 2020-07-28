import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getBaseUrl } from '../../main';
import { Categoria } from '../models/Categoria';
import { catchError, retry } from 'rxjs/operators';
import { Comercio } from '../models/Comercio';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {
  private http: HttpClient;
  private BASE_URL: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.BASE_URL = getBaseUrl();
  }

  ObtenerTodoCategorias() {
    let endpointUrl = this.BASE_URL + '/categoria/ObtenerTodoCategoria';
    return this.http.get<Categoria[]>(endpointUrl);
  }

  registrarComercio(comercio: Comercio) {
    let endpoint = this.BASE_URL + '/comercio/crearcomercio';

    return this.http.post<Comercio>(endpoint, comercio)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

   ObtenerComerciosAdmin(comercio: Comercio) {
    let endpointUrl = this.BASE_URL + '/comercio/ObtenerComerciosAdmin?idAdmin=' + comercio.idAdmin;

     return this.http.get<Comercio[]>(endpointUrl);
  }

  async obtenerTodoComercio() {
    let endpointUrl = this.BASE_URL + '/comercio/ObtenerTodoComercio';
    let comercios: Comercio[];

    return this.http.get<Comercio[]>(endpointUrl);
  }

  obtenerComercio(comercio: Comercio) {
    let endpointUrl = this.BASE_URL + '/comercio/ObtenerComercio?id=' + comercio.id;

    return this.http.get<Comercio>(endpointUrl);
  }

  eliminarComercio(id: number) {
    let endpoint = this.BASE_URL + '/comercio/EliminarComercio?id=' + id;
    return this.http.delete(endpoint)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  modificarComercio(comercio: Comercio) {
    let endpointUrl = this.BASE_URL + '/comercio/ModificarComercio';
    return this.http.put(endpointUrl, comercio)
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
