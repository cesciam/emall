import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Horario } from '../models/horario.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl : string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;}

    crearHorario(formData: Horario){
      return this.http.post(this.baseUrl+'/Horario/Create', formData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
    }

    obtenerTodoHorario(){
      let endpointUrl = this.baseUrl + '/Horario/RetrieveAll';
      return this.http.get<Horario[]>(endpointUrl);
    }

    obtenerHorarioPorSucursal(sucursal:number){
      let endpointUrl = this.baseUrl + '/Horario/RetrieveBySucursal/?sucursal='+sucursal;
      return this.http.get<Horario[]>(endpointUrl)
      
    }

    modificarHorario(horario:Horario){
      return this.http.put(this.baseUrl+'/Horario/Update', horario)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
    }

    borrarHorario(id:number){
      return this.http.delete(this.baseUrl+'/Horario/Delete?id='+id);
    }

    manejoErrores(err){
        return throwError(err.message);
    }
}
