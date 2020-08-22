import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Factura } from '../models/factura.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private http: HttpClient;
  private BASE_URL: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  obtenerFacturasxUsuario(idUsuario: number) {
    let endpointUrl = this.BASE_URL + '/factura/ObtenerFacturasxUsuario?idUsuario=' + idUsuario;
    return this.http.get<Factura[]>(endpointUrl);
  }

}
