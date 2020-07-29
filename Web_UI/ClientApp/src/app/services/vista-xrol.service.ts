import { Injectable } from '@angular/core';
import { Vista } from '../models/vista.model';
import { HttpClient } from '@angular/common/http';
import { VistaXRol } from '../models/vista-xrol.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VistaXRolService {

  vistaXRol : VistaXRol;
  readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  postVistaXRol(vistaXRol: VistaXRol){
    return this.http.post<VistaXRol>(this.BASE_URL+'VistaXRol/Create', vistaXRol)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );;
  }
}
