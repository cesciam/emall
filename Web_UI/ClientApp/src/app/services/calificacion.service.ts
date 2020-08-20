import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Calificacion } from '../models/calificacion.model';

@Injectable({
  providedIn: 'root'
})

export class CalificacionService {
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

  crear(calificacion: Calificacion): Observable<Calificacion> {
    console.log(JSON.stringify(calificacion));
    return this.http.post<Calificacion>(this.baseUrl + '/calificacion', JSON.stringify(calificacion), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  obtener(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.baseUrl + '/calificacion');
  }

  obtenerPorComercioId(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(this.baseUrl + '/calificacion/comercio/' + id);
  }

  obtenerPorItemId(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(this.baseUrl + '/calificacion/item/' + id);
  }
}
