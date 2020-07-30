import { Injectable } from '@angular/core';
import { Vista } from '../models/vista.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VistaService {

  list: Vista[];
  readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { 
    this.fillList();
  }

  fillList(){
    this.http.get(this.BASE_URL+'Vista/RetrieveAll')
    .toPromise().then(res=>this.list=res as Vista[]);
  }
}
