import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Multa } from '../models/multa';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

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

  async ObtenerMultasUsuario(id_usuario: number) {
    this.serviceApi = `/multa/RetrieveByUser/?id_usuario=${id_usuario}`;
    let multas: Multa[];

    multas = await this.http.get<Multa[]>(this.appUrl + this.serviceApi).toPromise();

    return multas;
  }

  deleteMulta(id_usuario: number): Observable<void> {
    this.serviceApi = `/multa/DeleteMulta/?id_usuario=${id_usuario}`;
    return this.http.delete<void>(this.appUrl + this.serviceApi);
  }

  crearMulta(multa: Multa): Observable<any> {
    this.serviceApi = `/multa/CreateMulta`;
    return this.http
      .post<void>(this.appUrl + this.serviceApi, multa, this.httpOptions)
      .pipe(catchError(this.errorHandler)
      );
  }

}
