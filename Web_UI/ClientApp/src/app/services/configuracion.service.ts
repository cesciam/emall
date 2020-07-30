import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuracion } from '../models/configuracion';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  serviceEndPoint: string;
  baseURL: string;

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
   }

  obtenerConfigContraseñaAntigua(): Observable<Configuracion> {
    this.serviceEndPoint = '/configuracion/Retrieves?codigo=contrasennas_antiguas';
    return this.http.get<Configuracion>(this.baseURL + this.serviceEndPoint);
  }

  registrarConfiguracion(config: Configuracion): Observable<void>{
    this.serviceEndPoint = '/configuracion/create';
    return this.http.post<void>(this.baseURL + this.serviceEndPoint, config, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  actualizarConfiguracion(config: Configuracion): Observable<void>{
    this.serviceEndPoint = '/configuracion/update';
    return this.http.put<void>(this.baseURL + this.serviceEndPoint, config, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }
}
