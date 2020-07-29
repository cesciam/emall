import { Injectable } from '@angular/core';
import { Vista } from '../models/vista.model';
import { HttpClient } from '@angular/common/http';
import { VistaXRol } from '../models/vista-xrol.model';

@Injectable({
  providedIn: 'root'
})
export class VistaXRolService {

  vistaXRol : VistaXRol;
  readonly BASE_URL = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  postVistaXRol(formData: VistaXRol){
    return this.http.post(this.BASE_URL+'VistaXRol/Create', formData);
  }
}
