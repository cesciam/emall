import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Envio } from '../models/envio.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private BASE_URL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  obtenerEnvio(idEnvio: number) {
    let endpointUrl = this.BASE_URL + '/envio/ObtenerEnvio?id=' + idEnvio;

    return this.http.get<Envio>(endpointUrl);
  }

}
