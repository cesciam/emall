import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  baseURL: string;
  serviceEndPoint: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseURL = baseUrl;
  }


  obtenerPromociones(): Observable<Promocion[]> {
    this.serviceEndPoint = '/promocion/RetrieveAll';
    return this.http.get<Promocion[]>(this.baseURL + this.serviceEndPoint);
  }

  eliminar(id: number): Observable<void>{
    this.serviceEndPoint = `/promocion/delete?id=${id}`;
    return this.http.delete<void>(this.baseURL + this.serviceEndPoint);
  }

  editar(promocion: Promocion): Observable<void> {
    this.serviceEndPoint = `/promocion/update`;
    return this.http.put<void>(this.baseURL + this.serviceEndPoint, promocion, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  obtenerPromocion(id: number): Observable<Promocion> {
    this.serviceEndPoint = `/promocion/retrieve?id=${id}`;
    return this.http.get<Promocion>(this.baseURL + this.serviceEndPoint);
  }

  registrarPromocion(promocion: Promocion): Observable<void>{
    this.serviceEndPoint = '/promocion/create';
    return this.http.post<void>(this.baseURL + this.serviceEndPoint, promocion, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  obtenerPromocionByCodigo(codigo: string) {
    let endpointUrl = this.baseURL + '/promocion/RetrieveByCodigo?codigo=' + codigo;

    return this.http.get<Promocion>(endpointUrl);
  }

}
