import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { EmpleadoList } from '../models/empleado-list.model';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  formData: Empleado;
  list: Empleado[];
  listUsuarios: Usuario[];
  private baseUrl: string;

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
    this.baseUrl = baseUrl;
   }

  postEmpleado(formData : Empleado) {
    return this.http.post(this.baseUrl + '/Empleado/Create', formData);
  }

  putEmpleado(formData : Empleado) {
    return this.http.put(this.baseUrl + '/Empleado/Update',formData)
  }

  fillList() {
    this.http.get(this.baseUrl + '/Empleado/RetrieveAllDatos')
    .toPromise().then(res => this.list = res as Empleado[])
  }

  obtenerEmpleados(comercio_id: number): Observable<EmpleadoList[]> {
    return this.http.get<EmpleadoList[]>(this.baseUrl + '/Empleado/RetrieveByComercioId?comercio=' + comercio_id);
  }

  deleteEmpleado(id: number) { 
    return this.http.delete(this.baseUrl + '/Empleado/Delete?id=' + id)
      .subscribe(response => {

      });
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + '/Empleado/RetrieveById?id=' + id)
    .toPromise().then(res => this.formData = res as Empleado)
  }
}
