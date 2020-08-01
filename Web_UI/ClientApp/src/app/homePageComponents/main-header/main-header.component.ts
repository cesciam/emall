import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  private usuarioLogueado: object = null;

  constructor() { }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
  }

  logout() {
    localStorage.removeItem('usuario-logueado');
    window.location.reload();
  }
}
