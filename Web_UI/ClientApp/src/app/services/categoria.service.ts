import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  formData: Categoria;
  private categorias: Categoria[];

  public BaseURL: string; 

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.BaseURL = baseUrl;
  }

  ObtenerTodoCategoria() {
    this.http.get(this.BaseURL + 'categoria/obtenertodocategoria')
      .toPromise().then(res => this.categorias = res as Categoria[])
  }

  ObtenerCategoria(nombre: string) {
    this.http.get(this.BaseURL + 'categoria/obtenercategoria' + nombre)

  }

  crearCategoria(categoria: Categoria) {

    return this.http.post(this.BaseURL + "categoria/crearcategoria", categoria)
      
  }
   

  modificarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(this.BaseURL + 'categoria/modificarcategoria', categoria)
  }

  eliminarCategoria(id:number) {
    return this.http.delete(this.BaseURL + 'categoria/eliminarcategoria/?id=' + id)
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<Categoria, any> {
    throw new Error("Method not implemented.");
  }
}
