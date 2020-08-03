import { Injectable } from '@angular/core';
import { Impuesto } from 'src/app/models/impuesto.model';
//import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  formData: Impuesto;
  public impuestos: Impuesto[];

  readonly BaseURL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  public ObtenerTodoImpuesto() {
    this.http.get(this.BaseURL + 'impuesto/obtenertodoimpuesto')
      .toPromise().then(res => this.impuestos = res as Impuesto[])
  }

  ObtenerTodoImpuestoItem() {
    let impuesto: Impuesto;

    impuesto = this.http.get<Impuesto>(this.BaseURL + 'impuesto/obtenertodoimpuesto');

    return impuesto;
  }


  public ObtenerImpuesto(nombre: string) {
    this.http.get(this.BaseURL + 'impuesto/obtenerimpuesto?nombre=' + nombre)
      .toPromise().then(res => this.formData = res as Impuesto)
    
  }

  public crearImpuesto(impuesto: Impuesto) {
    return this.http.post(this.BaseURL + "impuesto/crearimpuesto", impuesto)
      
  }
   

  public modificarImpuesto(impuesto: Impuesto): Observable<any> {
    return this.http.put(this.BaseURL + 'impuesto/modificarimpuesto/', impuesto)
  }

  public eliminarImpuesto(id: number) {
    return this.http.delete(this.BaseURL + 'impuesto/eliminarimpuesto/?id=' + id)
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<Impuesto, any> {
    throw new Error("Method not implemented.");
  }
}
