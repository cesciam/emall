import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  private usuarioLogueado: object = null;
  private usuario: Usuario;
  private id_comercio: number;

  constructor(private serviceSucursal: SucursalService) {
  }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
    console.log(this.usuarioLogueado)
  }

  validarEmpleado() {
    if (this.usuarioLogueado != null) {
      this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));
      if (this.usuario.Tipo == 4) {
        this.obtenerComercio();
      }
    }
  }

  logout() {
    localStorage.removeItem('usuario-logueado');
    window.location.reload();
  }

  obtenerComercio() {
    let usuario: Usuario
    usuario = JSON.parse(localStorage.getItem('usuario-logueado'));

    this.serviceSucursal.obtenerSucursalPorEmpleado(parseInt(usuario.Id)).subscribe(data => {
      this.id_comercio = data.idComercio;
    })
  }
}
