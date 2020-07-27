import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private usuarioLogueado: object = null;

  constructor() {
  }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
  }

  logout() {
    localStorage.removeItem('usuario-logueado');
    window.location.reload();
  }
}
