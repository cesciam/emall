import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Envio } from '../models/envio.model';
import { Transaccion } from '../models/transaccion.model'
import { Pago } from '../models/pago.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RealizarCompraService {

  private BASE_URL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  realizarPago(envio: Envio, transaccion: Transaccion) {
    let endpoint = this.BASE_URL + '/factura/CrearFactura';

   let pago : Pago = new Pago();
  pago.envio = envio;
  pago.transaccion = transaccion;

    return this.http.post(endpoint, pago)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

}
