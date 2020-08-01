import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { Vista } from '../models/vista.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public id_comercio : number;
  formData: Rol;
  list: Rol[];
  readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {
    this.fillList();
  }

  fillList(){
    this.http.get(this.BASE_URL+'Rol/RetrieveAll')
    .toPromise().then(res=>this.list=res as Rol[]);
  }

  fillRolComercio(){
    this.http.get(this.BASE_URL+'Rol/RetrieveByIdComercio'+'?id=' +this.id_comercio)
    .toPromise().then(res=>this.list=res as Rol[]);
  }

  deleteRol(id : number){
    return this.http.delete(this.BASE_URL+'Rol/Delete'+'?id=' +id)
  }

  postRol(formData: Rol){
    return this.http.post(this.BASE_URL+'Rol/Create', formData);
  }

  putRol(formData : Rol){
    return this.http.put(this.BASE_URL+'Rol/Update',formData)
  }

  getById(id: number){
    //TODO< QUE ESTA FUCKING LLAMADA FUNQUE
     return this.http.get(this.BASE_URL+'Rol/RetrieveById'+'?id=' +id)
      .toPromise().then(res=>this.formData =res as Rol)
  }

}
