import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EnvioList } from '../models/envio-list.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Envio } from '../models/envio.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  

  private baseUrl : string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;}


    obtenerEnvioListPorSucursal(sucursal:number){
      let endpointUrl = this.baseUrl + '/Envio/RetrieveEnvioListBySucursal?sucursal='+sucursal;
      return this.http.get<EnvioList[]>(endpointUrl)
      
    }

    obtenerEnvioPorId(id:number){
      let endpointUrl = this.baseUrl + '/Envio/RetrieveById?id='+id;
      return this.http.get<Envio>(endpointUrl)
    }

    obtenerEnvioListPorId(id:number){
      let endpointUrl = this.baseUrl + '/Envio/RetrieveEnvioListByid?id='+id;
      return this.http.get<EnvioList>(endpointUrl)
    }

    modificarEnvio(envio:Envio){
      return this.http.put(this.baseUrl+'/Envio/Update', envio)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
    }

}
