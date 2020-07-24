import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBaseUrl } from '../../main';
import { Categoria } from '../models/Categoria';

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
}
