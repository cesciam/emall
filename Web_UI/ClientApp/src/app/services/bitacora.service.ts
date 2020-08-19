import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bitacora } from '../models/bitacora.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  formData: Bitacora;
  
  public fecha: Date = new Date();
  
  public BaseURL: string;

  constructor(private http: HttpClient, private datePipe: DatePipe, @Inject('BASE_URL') baseUrl: string) {
    this.BaseURL = baseUrl;}

  public ObtenerTodoBitacora() :Observable<Bitacora[]>  {
    // let bitacora: Bitacora
    return this.http.get<Bitacora[]>(this.BaseURL + '/bitacora/obtenertodobitacora')
      //.toPromise().then(res => this.bitacoras = res as Bitacora[])
  }

  public crearBitacora(bitacora: Bitacora) {
    return this.http.post(this.BaseURL + "/bitacora/crearbitacora", bitacora)

  }

  public llenarBitacora(accion: string, usuario: number):Observable<any> {

    let bitacoraCrear: Bitacora = { Id: 0, Fecha: this.datePipe.transform(this.fecha, "yyyy-MM-dd"), Accion: accion, Usuario: usuario }; 

   return  this.crearBitacora(bitacoraCrear)
      
  }
}
