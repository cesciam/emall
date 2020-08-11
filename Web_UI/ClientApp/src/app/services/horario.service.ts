import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl : string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;}

    crearHorario(formData: Horario){
      return this.http.post(this.baseUrl+'/Horario/Create', formData);
    }

    obtenerTodoHorario(){
      let endpointUrl = this.baseUrl + '/Horario/RetrieveAll';
      return this.http.get<Horario[]>(endpointUrl);
    }
}
