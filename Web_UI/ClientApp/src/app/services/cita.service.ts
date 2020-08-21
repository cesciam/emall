import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/Cita';
import { CitaList } from '../models/CitaList';
import { CitaListEmp } from '../models/CitaListEmp';
import { CitaListCom } from '../models/CitaListCom';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  baseURL: string;
  serviceEndPoint: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseURL = baseUrl;
  }

  obtenerCitas(idUsuario: number): Observable<Cita[]> {
    this.serviceEndPoint = `/cita/obtener?id=${idUsuario}`;
    return this.http.get<Cita[]>(this.baseURL + this.serviceEndPoint);
  }

  obtenerCitasPorCliente(idUsuario: number): Observable<CitaList[]>{
    this.serviceEndPoint = `/cita/CitaPorUsuario?id=${idUsuario}&fecha=${this.getDateToday()}`;
    return this.http.get<CitaList[]>(this.baseURL + this.serviceEndPoint);
  }

  obtenerCitasPorEmpleado(id: number): Observable<CitaListEmp[]> {
    this.serviceEndPoint = `/cita/CitaPorEmpleado?id=${id}&fecha=${this.getDateToday()}`;
    return this.http.get<CitaListEmp[]>(this.baseURL + this.serviceEndPoint);
  }

  obtenerCitasPorComercio(id: number): Observable<CitaListCom[]> {
    this.serviceEndPoint = `/cita/CitaPorComercio?id=${id}&fecha=${this.getDateToday()}`;
    return this.http.get<CitaListCom[]>(this.baseURL + this.serviceEndPoint);
  }

  obtenerCitasPorSucursal(id: number): Observable<CitaListCom[]> {
    this.serviceEndPoint = `/cita/CitaPorSucursal?id=${id}&fecha=${this.getDateToday()}`;
    return this.http.get<CitaListCom[]>(this.baseURL + this.serviceEndPoint);
  }

  registrarCitaServicio(cita: Cita): Observable<void> {
    this.serviceEndPoint = '/cita/RegistrarCitaServicio';
    return this.http.post<void>(this.baseURL + this.serviceEndPoint, cita, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  registrarCitaProducto(cita: Cita): Observable<void> {
    this.serviceEndPoint = '/cita/RegistrarCitaProducto';

    return this.http.post<void>(this.baseURL + this.serviceEndPoint, cita, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  getDateToday(): string {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();
    return year + "/" + month + "/" + day;
  }
}
