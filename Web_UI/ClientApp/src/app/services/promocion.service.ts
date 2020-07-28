import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  readonly BASE_URL = 'http://localhost:5000/api/';
  serviceEndPoint: string;

  constructor(private http: HttpClient) { }


  obtenerPromociones(): Observable<Promocion[]> {
    this.serviceEndPoint = 'promocion/RetrieveAll';
    return this.http.get<Promocion[]>(this.BASE_URL + this.serviceEndPoint);
  }
}
