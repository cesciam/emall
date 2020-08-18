import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListaDeseo } from '../models/lista-deseo';

@Injectable({
  providedIn: 'root'
})
export class ListaDeseoService {

  appUrl: string;
  serviceApi: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.appUrl = baseUrl;
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return observableThrowError(errorMessage);
  }

  async ObtenerLista(id_usuario: number) {
    this.serviceApi = `/listadeseo/RetrieveByUser/?id_usuario=${id_usuario}`;
    let lista: ListaDeseo;

    lista = await this.http.get<ListaDeseo>(this.appUrl + this.serviceApi).toPromise();

    return lista;
  }

  deleteLista(id_usuario: number, id_item): Observable<void> {
    this.serviceApi = `/listadeseo/DeleteLista/?id_usuario=${id_usuario}&id_item=${id_item}`;
    return this.http.delete<void>(this.appUrl + this.serviceApi);
  }

  crearLista(lista: ListaDeseo): Observable<any> {
    this.serviceApi = `/listadeseo/CreateLista`;
    return this.http
      .post<void>(this.appUrl + this.serviceApi, lista, this.httpOptions)
      .pipe(catchError(this.errorHandler)
      );
  }

}
