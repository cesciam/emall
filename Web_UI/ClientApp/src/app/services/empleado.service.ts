import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  formData: Empleado;
  list: Empleado[];
  listUsuarios: Usuario[];

  //private BASE_URL: string;
  readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http : HttpClient) {
    //this.BASE_URL = 'http://localhost:5000/api/'
   }

   postEmpleado(formData : Empleado){
     return this.http.post(this.BASE_URL+'Empleado/Create', formData);
   }

   putEmpleado(formData : Empleado){
     return this.http.put(this.BASE_URL+'Empleado/Update',formData)
   }

   fillList(){
    //this.http.get<Empleado[]>(this.BASE_URL+'Empleado/RetrieveAll').subscribe(
     // result =>{},error => console.error(error)
    //);

     this.http.get(this.BASE_URL+'Empleado/RetrieveAllDatos')
     .toPromise().then(res=>this.list = res as Empleado[])
   }

   deleteEmpleado(id: number){
     return this.http.delete(this.BASE_URL+'Empleado/Delete'+'?id=' +id)
   }
}
