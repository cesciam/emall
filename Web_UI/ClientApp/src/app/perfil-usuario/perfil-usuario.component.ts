import { ComercioService } from '../services/comercio.service';
import { Usuario } from '../models/usuario.model';
import { PerfilAdminComercioComponent } from '../perfil-admin-comercio/perfil-admin-comercio.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  private usuarioLogueado: object = null;
  private id: number;

  constructor(private duenno: PerfilAdminComercioComponent) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
    
  }
  ngOnInit() {
    this.duenno.llenarComercios();
  }
}
