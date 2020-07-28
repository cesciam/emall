import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from '../models/item';


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
    this.serviceApi = '/item/CreateItem';
    return this.http
      .post<void>(this.appUrl + this.serviceApi, item, this.httpOptions)
      .pipe(catchError(this.errorHandler)
      );
  }





}
