import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from '../models/item';
import { Archivo } from '../models/Archivo';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  appUrl: string;
  serviceApi: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.appUrl = baseUrl;
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return observableThrowError(errorMessage);
  }

  crearItem(item: Item): Observable<any> {
    this.serviceApi = `/item/CreateItem`;
    return this.http
      .post<void>(this.appUrl + this.serviceApi, item, this.httpOptions)
      .pipe(catchError(this.errorHandler)
      );
  }

  getItemSucursal(id_sucursal: number): Observable<Item[]> {
    this.serviceApi = `/item/RetrieveAllBySucursal/?id_sucursal=${id_sucursal}`;
    return this.http
      .get<Item[]>(this.appUrl + this.serviceApi);
  }

  deleteItem(id: number): Observable<void> {
    this.serviceApi = `/item/DeleteItem/?id=${id}`;
    return this.http.delete<void>(this.appUrl + this.serviceApi);
  }

  getItemById(id: number): Observable<Item> {
    this.serviceApi = `/item/RetrieveByIdItem/?id=${id}`;
    return this.http
      .get<Item>(this.appUrl + this.serviceApi);
  }

  getItemArchivo(id: number): Observable<Archivo> {
    this.serviceApi = `/item/RetrieveItemArchivo/?id=${id}`;
    return this.http
      .get<Archivo>(this.appUrl + this.serviceApi);
  }

  getItemTipo(tipo: string): Observable<Item[]> {
    this.serviceApi = `/item/RetrieveAllByTipo/?tipo=${tipo}`;
    return this.http
      .get<Item[]>(this.appUrl + this.serviceApi);
  }

  getItemBusqueda(busqueda: string): Observable<Item[]> {
    this.serviceApi = `/item/ItemBusqueda/?busqueda=${busqueda}`;
    return this.http
      .get<Item[]>(this.appUrl + this.serviceApi);
  }


  async ObtenerItem(id_item: number) {
    this.serviceApi = `/item/RetrieveByIdItem/?id=${id_item}`;
    let item: Item;

    item = await this.http.get<Item>(this.appUrl + this.serviceApi).toPromise();

    return item;
  }

  async ObtenerArchivo(id_foto: number) {
    this.serviceApi = `/item/RetrieveItemArchivo/?id=${id_foto}`;
    let foto: Archivo;

    foto = await this.http.get<Archivo>(this.appUrl + this.serviceApi).toPromise();

    return foto;
  }

  updateArchivo(archivo: Archivo): Observable<void> {
    this.serviceApi = '/item/UpdateArchivo';
    return this.http.
      put<void>(this.appUrl + this.serviceApi, archivo, {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      });
  }


  updateItem(updatedItem: Item): Observable<void> {
    this.serviceApi = '/item/UpdateItem';
    return this.http.
      put<void>(this.appUrl + this.serviceApi, updatedItem, {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      });
  }
}
