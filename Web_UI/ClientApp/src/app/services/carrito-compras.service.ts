import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Envio } from '../models/envio.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  private BASE_URL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  registrarEnvio(envio: Envio) {
    let endpointUrl = this.BASE_URL + '/envio/crearenvio';

    return this.http.post<Envio>(endpointUrl, envio)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

}
