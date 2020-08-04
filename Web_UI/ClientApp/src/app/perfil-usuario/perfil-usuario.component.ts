import { ComercioService } from '../services/comercio.service';
import { Usuario } from '../models/usuario.model';
import { PerfilAdminComercioComponent } from '../perfil-admin-comercio/perfil-admin-comercio.component';
import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
 private usuarioLogueado: object = null;
  private id: number;
  private comercios: Comercio[];

  constructor(private comercioService: ComercioService) {
    this.usuarioLogueado= JSON.parse(localStorage.getItem('usuario-logueado'));
    
  }
  ngOnInit() {
    let usuarioBuscar: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuarioActivado: Usuario = usuarioBuscar.usuario;

    this.comerciosDuenno(usuarioActivado);
  }

  comerciosDuenno(usuario: Usuario) {
    let comercio: Comercio = new Comercio();
    comercio.idAdmin = parseInt(usuario.Id);
    this.comercioService.ObtenerComerciosAdmin(comercio)
      .subscribe(data => this.comercios = data);
  }
}
