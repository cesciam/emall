import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})

export class ListarUsuarioComponent implements OnInit {
  private usuarios: Usuario[];
  private submitted: boolean = false;
  private error: object = null;
  private filtroUsuarios = '';
  private usuarioAEliminar: number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  agregarUsuario(): void {
    this.router.navigate(['dashboard-admin/usuario/agregar-usuario']);
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios()
      .subscribe(data => this.usuarios = data);
  }

  activarUsuario(id: number): void {
    this.usuarioService.activarUsuario(id, 'YWN0aXZhZG8gcG9yIGFkbWlu')
      .subscribe(
        (response) => {
          console.log(response)
          this.obtenerUsuarios();
        },
        (error) => {
          this.error = error.error;
            console.log(error);
            this.error = { message: 'Error general al activar el usuario. Vuelva a intertarlo en unos minutos' };
        });
  }

  setUsuarioAEliminar(id: number) {
    this.usuarioAEliminar = id;
  }

  eliminarUsuario(): void {
    this.submitted = true;

    this.usuarioService.eliminarUsuario(this.usuarioAEliminar)
      .subscribe(
        (response) => {
          this.obtenerUsuarios();
          this.submitted = false;
        },
        (error) => {
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al eliminar el usuario. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);
        }
      );
  }
}
