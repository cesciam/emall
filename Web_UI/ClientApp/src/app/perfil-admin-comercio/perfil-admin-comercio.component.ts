import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { ComercioService } from '../services/comercio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin-comercio',
  templateUrl: './perfil-admin-comercio.component.html',
  styleUrls: ['./perfil-admin-comercio.component.css']
})
export class PerfilAdminComercioComponent implements OnInit {

  private comercios: Comercio[];
  private comercioService: ComercioService;
  private error: any;

  constructor(comercioService: ComercioService, private router: Router) {
    this.comercioService = comercioService;
    this.error = null;
  }

  ngOnInit() {
    this.llenarComercios();
  }

  async llenarComercios() {
    this.comercios = await  this.comercioService.obtenerTodoComercio();
  }

  seleccionarComercio(id: number) {
    this.router.navigate(['']);
  }

  eliminarComercio(id: number) {
    this.comercioService.eliminarComercio(id)
      .subscribe(
        (response) => {
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
