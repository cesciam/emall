import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../services/comercio.service';
import { Comercio } from '../models/Comercio';
import { Sucursal } from '../models/Sucursal';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { VistaService } from '../services/vista.service';
import { Vista } from '../models/vista.model';

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
  private filterSucursal = ''; 
  private permisoSucursales: boolean;
  private permisoProductos: boolean;
  private permisoEmpleados: boolean;
  private permisoRoles: boolean;
  private permisoPromociones: boolean;
  private permisoArchivos: boolean;
  private permisoEditarComercio: boolean;
  private permisoHorario: boolean;


  constructor(comercioService: ComercioService, sucursalService: SucursalService, private activatedRoute: ActivatedRoute, private vistaService: VistaService) {
    this.comercioService = comercioService;
    this.sucursalService = sucursalService;
    this.error = null;
  }

  ngOnInit() {
    this.llenarComercio();
    this.validarEmpleado();

  }

  validarEmpleado(){
    let usuarioLocal: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuarioLogueado: Usuario = usuarioLocal.usuario;

    let vistas : Vista[];

    if (usuarioLogueado.Tipo == 4) {
      this.vistaService.obtenerVistasPorUsuario(parseInt(usuarioLogueado.Id))
        .subscribe(data => {
          vistas = data;
          this.validarVistas(vistas);
        });
    } else {
      this.permisoSucursales = true;
      this.permisoProductos = true;
      this.permisoEmpleados = true;
      this.permisoRoles = true;
      this.permisoPromociones = true;
      this.permisoArchivos = true;
      this.permisoEditarComercio = true;
      this.permisoHorario = true;
    }
  }

  validarVistas(vistas: Vista[]){
    for(let vista of vistas) {
        switch(vista.nombre) {
          case "sucursales":
            this.permisoSucursales = true;
          break;
          case "productos":
            this.permisoProductos = true;
          break;
          case "empleados":
            this.permisoEmpleados = true;
          break;
          case "roles":
            this.permisoRoles = true;
          break;
          case "promociones":
            this.permisoPromociones = true;
          break;
          case "achivos":
            this.permisoArchivos = true;
          break;
          case "editar comercio":
            this.permisoEditarComercio = true;
          break;
          case "horarios":
            this.permisoEditarComercio = true;
          break;
        };
    }
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
