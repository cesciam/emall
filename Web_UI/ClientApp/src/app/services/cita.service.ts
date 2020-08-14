import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/Cita';
import { CitaList } from '../models/CitaList';

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

  obtenerCitasPorEmpleado(idUsuario: number): Observable<CitaList[]>{
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();
    var date= year + "/" + month + "/" + day;

    this.serviceEndPoint = `/cita/CitaPorUsuario?id=${idUsuario}&fecha=${date}`;
    return this.http.get<CitaList[]>(this.baseURL + this.serviceEndPoint);
  }
}
