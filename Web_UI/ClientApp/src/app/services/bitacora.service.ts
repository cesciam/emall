import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bitacora } from '../models/bitacora.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  formData: Bitacora;
  public bitacora: Bitacora[];
  public fecha: Date = new Date();
  
  
  
  readonly BaseURL = 'http://localhost:5000/api/'; //inject

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  
  ObtenerTodoBitacora() {
   return this.http.get<Bitacora[]>(this.BaseURL + 'bitacora/obtenertodobitacora')
      .toPromise().then(res => this.bitacora = res as Bitacora[])
  }

  public crearBitacora(bitacora: Bitacora) {


    return this.http.post(this.BaseURL + "bitacora/crearbitacora", bitacora)

  }

  public llenarBitacora(accion: string, usuario: number):Observable<any> {

    let bitacoraCrear: Bitacora = { Id: 0, Fecha: this.datePipe.transform(this.fecha, "yyyy-MM-dd"), Accion: accion, Usuario: usuario }; 

   return  this.crearBitacora(bitacoraCrear)
      
  }
}
