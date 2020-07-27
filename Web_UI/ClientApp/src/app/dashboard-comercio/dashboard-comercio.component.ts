import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../services/comercio.service';
import { Comercio } from '../models/Comercio';
import { Sucursal } from '../models/Sucursal';
import { SucursalService } from '../services/sucursal.service';

@Component({
  selector: 'app-dashboard-comercio',
  templateUrl: './dashboard-comercio.component.html',
  styleUrls: ['./dashboard-comercio.component.css']
})
export class DashboardComercioComponent implements OnInit {

  private comercioService: ComercioService;
  private sucursalService: SucursalService;
  private comercioSeleccionado: Comercio;
  private sucursales: Sucursal[];
  private error: any;

  constructor(comercioService: ComercioService, sucursalService: SucursalService) {
    this.comercioService = comercioService;
    this.sucursalService = sucursalService;
    this.error = null;
  }

  ngOnInit() {
    this.comercioSeleccionado = JSON.parse(localStorage.getItem('comercioSeleccionado'));
    console.log(this.comercioSeleccionado);
    this.llenarSucursales();
  }

  async llenarSucursales() {
    this.sucursales = await this.sucursalService.ObtenerTodoSucursales(this.comercioSeleccionado.id);
  }

  eliminarSucursal(sucursal: Sucursal) {
    this.sucursalService.eliminarSucursal(sucursal.id)
      .subscribe(
        (response) => {
          this.sucursales = this.sucursales.filter(s => s !== sucursal);
        },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
  }



}
