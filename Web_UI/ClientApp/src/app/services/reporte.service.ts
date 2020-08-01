import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../models/Reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  baseURL: string;
  serviceEndPoint: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
   }

  getComercioPorCat(): Observable<Reporte[]>{
    this.serviceEndPoint = '/reporte/comercioPorCategoria';
    return  this.http.get<Reporte[]>(this.baseURL + this.serviceEndPoint);
  }

  getEmpleadoPorCom(): Observable<Reporte[]> {
    this.serviceEndPoint = '/reporte/empleadoPorCategoria';
    return  this.http.get<Reporte[]>(this.baseURL + this.serviceEndPoint);
  }

  getUsuarioTipo(): Observable<Reporte[]> {
    this.serviceEndPoint = '/reporte/usuarioPorTipo';
    return this.http.get<Reporte[]>(this.baseURL + this.serviceEndPoint);
  }

  getUsuarioEstado(): Observable<Reporte[]> {
    this.serviceEndPoint = '/reporte/usuarioPorEstado';
    return this.http.get<Reporte[]>(this.baseURL + this.serviceEndPoint);
  }
}
