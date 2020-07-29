import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { ComercioService } from '../services/comercio.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-perfil-admin-comercio',
  templateUrl: './perfil-admin-comercio.component.html',
  styleUrls: ['./perfil-admin-comercio.component.css']
})
export class PerfilAdminComercioComponent implements OnInit {

  private comercios: Comercio[];
  private comercioService: ComercioService;
  private error: any;
  private filterComercio = ''; 

  constructor(comercioService: ComercioService, private router: Router) {
    this.comercioService = comercioService;
    this.error = null;
  }

  ngOnInit() {
    this.llenarComercios();
  }

  llenarComercios() {
    let usuarioLocal: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuarioLogueado: Usuario = usuarioLocal.usuario;

    let comercio: Comercio = new Comercio();
    comercio.idAdmin = parseInt(usuarioLogueado.Id);

    this.comercioService.ObtenerComerciosAdmin(comercio)
      .subscribe(data => this.comercios = data);
  }

  eliminarComercio(comercio: Comercio) {
    this.comercioService.eliminarComercio(comercio.id)
      .subscribe(
        (response) => {
          this.comercios = this.comercios.filter(c => c !== comercio);
        },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
  }


  collapse() {
    let element: HTMLElement = document.getElementById('wrapper');
    element.classList.toggle('toggled');
  }
}
