import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
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

  deleteRol(id : number){
    return this.http.delete(this.BASE_URL+'Rol/Delete'+'?id=' +id)
    //pendiente hacer el cambio en el backend
  }

  postRol(formData: Rol){
    return this.http.post(this.BASE_URL+'Rol/Create', formData);
  }

  putEmpleado(formData : Rol){
    return this.http.put(this.BASE_URL+'Rol/Update',formData)
  }

}
