import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  formData: Categoria;
  private categorias: Categoria[];

  readonly BaseURL = 'http://localhost:5000/api/'; //inject 

  constructor(private http: HttpClient) { }

  ObtenerTodoCategoria() {
    this.http.get(this.BaseURL + 'categoria/obtenertodocategoria')
      .toPromise().then(res => this.categorias = res as Categoria[])
  }

  ObtenerCategoria(nombre: string) {
    this.http.get(this.BaseURL + 'categoria/obtenercategoria' + nombre)

  }

  crearCategoria(categoria: Categoria) {

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Categoria>(this.BaseURL + "/crearcategoria", categoria)
      .pipe(catchError(this.handleError));
  }
   

  modificarCategoria(categoria: Categoria) {
    this.http.put(this.BaseURL + 'categoria/modificarcategoria', categoria)
  }

  eliminarCategoria(id:number) {
    return this.http.delete(this.BaseURL + 'impuesto/eliminarcategoria/?id=' + id)
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<Categoria, any> {
    throw new Error("Method not implemented.");
  }
}
