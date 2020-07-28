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

  async ObtenerTodoCategorias() {
    let endpointUrl = this.BASE_URL + '/categoria/ObtenerTodoCategoria';
    let categorias: Categoria[];

    categorias = await this.http.get<Categoria[]>(endpointUrl).toPromise();

    return categorias;
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

  async obtenerTodoComercio() {
    let endpointUrl = this.BASE_URL + '/comercio/ObtenerTodoComercio';
    let comercios: Comercio[];

    comercios = await this.http.get<Comercio[]>(endpointUrl).toPromise();

    return comercios;
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
