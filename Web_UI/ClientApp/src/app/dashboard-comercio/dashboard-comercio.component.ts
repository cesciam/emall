import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../services/comercio.service';
import { Comercio } from '../models/Comercio';
import { Sucursal } from '../models/Sucursal';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(comercioService: ComercioService, sucursalService: SucursalService, private activatedRoute: ActivatedRoute) {
    this.comercioService = comercioService;
    this.sucursalService = sucursalService;
    this.error = null;
  }

  ngOnInit() {
    this.llenarComercio();
  }

  llenarComercio() {
    let idComercio: number = this.activatedRoute.snapshot.queryParams['comercio'];
    let comercio = new Comercio();
    comercio.id = idComercio;

    this.comercioService.obtenerComercio(comercio)
      .subscribe(data => {
        this.comercioSeleccionado = data
        this.llenarSucursales();
      });
  }

   llenarSucursales() {
     this.sucursalService.ObtenerTodoSucursales(this.comercioSeleccionado.id)
       .subscribe(data => this.sucursales = data);
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
