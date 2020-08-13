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
  private usuarioFromLS: {
    token: string,
    usuario: {
      Apellido: string,
      Cedula: string,
      CodigoCorreo: string,
      CodigoTelefono: string,
      Correo: string,
      CorreoConfirmado: number,
      Estado: number,
      Foto: { id: number, nombre: null, enlace: null, tipo: null, id_comercio: 0 },
      Id: number,
      Nombre: string,
      Telefono: string,
      TelefonoConfirmado: number,
      Tipo: number
    }

  }
  private usuario: Usuario;
  public id_comercio: number;

  constructor(private serviceSucursal: SucursalService) {
  }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.usuarioFromLS = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.validarEmpleado();
  }

  validarEmpleado() {
    if (this.usuarioLogueado != null) {
      if (this.usuarioFromLS.usuario.Tipo == 4) {
        this.obtenerComercio();
      }
    }
  }

  logout() {
    localStorage.removeItem('usuario-logueado');
    window.location.reload();
  }

  obtenerComercio() {

    this.serviceSucursal.obtenerSucursalPorEmpleado(this.usuarioFromLS.usuario.Id).subscribe(data => {
      this.id_comercio = data.idComercio;
    })
  }

}
