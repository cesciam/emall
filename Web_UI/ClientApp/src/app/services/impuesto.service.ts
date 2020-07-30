import { Injectable } from '@angular/core';
import { Impuesto } from 'src/app/models/impuesto.model';
//import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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

  public ObtenerImpuesto(nombre: string) {
    this.http.get(this.BaseURL + 'impuesto/obtenerimpuesto?nombre=' + nombre)
      .toPromise().then(res => this.impuestos = res as Impuesto[])
    
  }

  public crearImpuesto(impuesto: Impuesto) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Impuesto>(this.BaseURL + "/crearimpuesto", impuesto)
      .pipe(catchError(this.handleError));
  }
   

  public modificarImpuesto(impuesto: Impuesto) {
    this.http.put(this.BaseURL + 'impuesto/modificarimpuesto/', impuesto)
  }

  public eliminarImpuesto(id: number) {
    return this.http.delete(this.BaseURL + 'impuesto/eliminarimpuesto/?id=' + id)
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<Impuesto, any> {
    throw new Error("Method not implemented.");
  }
}
