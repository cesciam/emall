import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { RegistroUsuario } from '../models/registro-usuario.model';
import { LoginUsuario } from '../models/login-usuario.model';
import { SesionUsuario } from '../models/sesion-usuario.model'; 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
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

  registrarUsuario(nuevoUsuario: RegistroUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + '/usuario/registrar', JSON.stringify(nuevoUsuario), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + '/usuario');
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + '/usuario/' + id);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.baseUrl + '/usuario/', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  activarUsuario(id: number, codigo: string): Observable<{}> {
    return this.http.get(this.baseUrl + '/usuario/' + id + '/activar/' + codigo, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );;
  }

  eliminarUsuario(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/usuario/' + id, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  login(login: LoginUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + '/usuario/login', JSON.stringify(login), this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
