import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { Impuesto } from 'src/app/models/impuesto.model'; 
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-listar-impuesto',
  templateUrl: './listar-impuesto.component.html',
  styleUrls: ['./listar-impuesto.component.css']
})

export class ListarImpuestoComponent implements OnInit {

  private usuarioLogueado: string;
  public selectedImpuesto: Impuesto = { Id: null, Nombre: '', Porcentaje: null };
  buscarImpuesto = '';
  private error: object = null;
  public accionEditar: string = "Edición impuesto";
  public accion: string = "Eliminación impuesto";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private service: ImpuestoService, private bitacora: BitacoraService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
    console.log(this.id_usuario);}

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
    this.service.modificarImpuesto(selectedImpuesto).subscribe(res => {
      this.obtenerTodo();
    });

    this.bitacora.llenarBitacora(this.accionEditar, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
  }

   public eliminar(id: number) {
     this.service.eliminarImpuesto(id).subscribe(res => {
       this.service.ObtenerTodoImpuesto();
     });

     this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
       (error) => {
         this.error = error.error;
         window.scroll(0, 0);
       });
  }
}
