import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DireccionService } from '../../services/direccion.service';
import { Direccion } from '../../models/direccion.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-listar-direccion',
  templateUrl: './listar-direccion.component.html',
  styleUrls: ['./listar-direccion.component.css']
})
export class ListarDireccionComponent implements OnInit {
  private direcciones: Direccion[] = [];
  private submitted: boolean = false;
  private error: object = null;
  private filtroDirecciones = '';
  private direccionAEliminar: number;
  private usuarioLogueado: Usuario = null;

  constructor(
    private direccionService: DireccionService,
    private router: Router
  ) { }

  ngOnInit() {
    let storageData = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.usuarioLogueado = storageData['usuario'];

    this.obtenerDirecciones();
  }

  agregarDireccion(): void {
    this.router.navigate(['/direcciones/agregar-direccion']);
  }

  obtenerDirecciones(): void {
    this.direccionService.obtenerDireccionesPorUsuarioId(+this.usuarioLogueado.Id)
      .subscribe(data => this.direcciones = data);
  }

  setDireccionAEliminar(id: number) {
    this.direccionAEliminar = id;
  }

  predeterminada(id: number) {
    this.direccionService.predeterminada(id)
    .subscribe((response) => { 
      this.obtenerDirecciones();
     });
  }

  eliminarDireccion(): void {
    this.submitted = true;

    this.direccionService.eliminarDireccion(this.direccionAEliminar)
      .subscribe(
        (response) => {
          this.obtenerDirecciones();
          this.submitted = false;
        },
        (error) => {
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al eliminar la direccion. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);
        }
      );
  }
}
