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
    let endpointUrl = this.BASE_URL + 'api/categoria/ObtenerTodoCategoria';
    let categorias: Categoria[];

    categorias = await this.http.get<Categoria[]>(endpointUrl).toPromise();

    return categorias;
  }

  registrarComercio(comercio: Comercio) {
    let endpoint = this.BASE_URL + 'comercio/crearcomercio';

    return this.http.post<any>(endpoint, comercio)
      .pipe(
        catchError(this.handleError)
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
