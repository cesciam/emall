import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBaseUrl } from '../../main';
import { Categoria } from '../models/Categoria';
import { Comercio } from '../models/Comercio';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {
  private http: HttpClient;
  private BASE_URL: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.BASE_URL = getBaseUrl();
  }

  async ObtenerTodoCategorias() {
    let endpointUrl = this.BASE_URL + 'api/categoria/ObtenerTodoCategoria';
    let categorias: Categoria[];

    categorias = await this.http.get<Categoria[]>(endpointUrl).toPromise();

    return categorias;
  }

  registrarComercio(comercio: Comercio) {
    let endpoint = this.BASE_URL + 'comercio/crearcomercio';
    let res: any;

    this.http.post(endpoint, comercio).subscribe(result => {
        res = result;
      console.log(result);
    }, error => {
        res = error;
      console.error(error);
    });

    return res;
  }
}
