import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  private usuarios: Usuario[];

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

}
