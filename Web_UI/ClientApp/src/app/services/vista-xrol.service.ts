import { Injectable } from '@angular/core';
import { Vista } from '../models/vista.model';
import { HttpClient } from '@angular/common/http';
import { VistaXRol } from '../models/vista-xrol.model';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VistaXRolService {
  list: VistaXRol[];
  vistaXRol: VistaXRol;
  readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  postVistaXRol(vistaXRol: VistaXRol) {
    return this.http.post<VistaXRol>(this.BASE_URL + 'VistaXRol/Create', vistaXRol)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );;
  }

  putVistaXRol(vistaXRol: VistaXRol) {
    return this.http.put<VistaXRol>(this.BASE_URL + 'VistaXRol/Update', vistaXRol)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );;
  }

  getByRol(id: number): Observable<VistaXRol[]> {
    let endpointUrl = this.BASE_URL + 'vistaxRol/retrieveByRol?id=' + id;

    return this.http.get<VistaXRol[]>(endpointUrl)

    // this.http.get(this.BASE_URL + 'vistaxRol/retrieveByRol?id=' + id)
    //   .toPromise().then(res => this.list = res as VistaXRol[])
    
  }
}
