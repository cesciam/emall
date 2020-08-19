import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BitacoraService } from '../../../services/bitacora.service';

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

  private usuarioLogueado: string;
  public accion: string = "Eliminación usuario";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private bitacora: BitacoraService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id; }

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

          this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
            (error) => {
              this.error = error.error;
              window.scroll(0, 0);
            });
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
