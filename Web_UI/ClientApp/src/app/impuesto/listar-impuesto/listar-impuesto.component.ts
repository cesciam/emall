import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { Impuesto } from 'src/app/models/impuesto.model'; 

@Component({
  selector: 'app-listar-impuesto',
  templateUrl: './listar-impuesto.component.html',
  styleUrls: ['./listar-impuesto.component.css']
})

export class ListarImpuestoComponent implements OnInit {

  public selectedImpuesto: Impuesto = { Id: null, Nombre: '', Porcentaje: null };
  buscarImpuesto = ''; 

  constructor(private service: ImpuestoService) { }

  ngOnInit() {
    this.obtenerTodo(); 

  }

  public obtenerTodo():void {
    this.service.ObtenerTodoImpuesto()
  }

  public obtener(nombre:string ): void {
    this.service.ObtenerImpuesto(nombre);
  }

  public editar(impuesto: Impuesto): void {

    this.selectedImpuesto = impuesto;
    
  }

  public completarModificar(selectedImpuesto: Impuesto): void {
    this.service.modificarImpuesto(this.selectedImpuesto);
  }

   public eliminar(id: number) {
    this.service.eliminarImpuesto(id).subscribe(res => {
      this.service.ObtenerTodoImpuesto();
    })
  }
}
