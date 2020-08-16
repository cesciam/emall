import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Direccion } from '../models/direccion.model';
import { Provincia } from '../models/provincia.model';
import { Canton } from '../models/canton.model';
import { Distrito } from '../models/distrito.model';

@Injectable({
  providedIn: 'root'
})

export class DireccionService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    })
  };

  registrarDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(this.baseUrl + '/direccion', JSON.stringify(direccion), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  obtenerDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.baseUrl + '/direccion');
  }

  obtenerDireccionPorId(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(this.baseUrl + '/direccion/' + id);
  }

  obtenerDireccionesPorUsuarioId(usuarioId: number): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.baseUrl + '/direccion/usuario/' + usuarioId);
  }

  editarDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(this.baseUrl + '/direccion/', JSON.stringify(direccion), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  eliminarDireccion(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/direccion/' + id, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  predeterminada(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(this.baseUrl + '/direccion/' + id + '/predeterminada', this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  obtenerProvincias(): Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.baseUrl + '/direccion/provincia');
  }

  obtenerCantones(provincia: number): Observable<Canton[]> {
    return this.http.get<Canton[]>(this.baseUrl + '/direccion/canton/' + provincia, this.httpOptions);
  }

  obtenerDistritos(provincia: number, canton: number): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.baseUrl + '/direccion/provincia/' + provincia + '/canton/' + canton + '/distrito', this.httpOptions);
  }
}
