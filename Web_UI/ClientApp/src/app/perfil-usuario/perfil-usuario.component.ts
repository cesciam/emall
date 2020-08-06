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
 private usuarioLogueado: Usuario = null;
  private id: number;
  private comercios: Comercio[];
  private section: string = 'info';
  private image: string;

  constructor(private comercioService: ComercioService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
  }

  ngOnInit() {
    let usuarioBuscar: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuarioActivado: Usuario = usuarioBuscar.usuario;

    if (this.usuarioLogueado['usuario'].Foto != null) {
      this.image = this.usuarioLogueado['usuario'].Foto.enlace;
    } else {
      this.image = null;
    }

    this.comerciosDuenno(usuarioActivado);
  }

  changeSection(section: string): void {
    this.section = section;
    window.scroll(0, 0);
  }

  comerciosDuenno(usuario: Usuario) {
    let comercio: Comercio = new Comercio();

    comercio.idAdmin = parseInt(usuario.Id);
    
    this.comercioService.ObtenerComerciosAdmin(comercio)
      .subscribe(data => this.comercios = data);
  }
}
