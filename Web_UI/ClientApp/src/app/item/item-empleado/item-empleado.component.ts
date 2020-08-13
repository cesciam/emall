import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { SucursalService } from '../../services/sucursal.service';
import { UsuarioService } from '../../services/usuario.service';
import { ComercioService } from '../../services/comercio.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from "@angular/router";
import { Sucursal } from '../../models/Sucursal';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../models/empleado.model';
import { Usuario } from '../../models/usuario.model';
import { EmpleadoList } from '../../models/empleado-list.model';
import { Comercio } from '../../models/Comercio';

@Component({
  selector: 'app-item-empleado',
  templateUrl: './item-empleado.component.html',
  styleUrls: ['./item-empleado.component.css']
})
export class ItemEmpleadoComponent implements OnInit {


  id_item: number;
  id_sucursal: number;
  item: Item;
  sucursal: Sucursal;
  comercio: Comercio;
  empleados_sucursal: Array<EmpleadoList>;
  empleados_comercio: EmpleadoList[];
  usuarios: Array<Usuario>;



  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router, private sucursalService: SucursalService, private comercioService: ComercioService) {

    this.id_item = parseInt(this.route.snapshot.params['id_item']);
    this.id_sucursal = parseInt(this.route.snapshot.params['id_sucursal']);
    this.empleados_sucursal = new Array<EmpleadoList>();
    this.item = new Item();

    

  }

  ngOnInit() {
    this.llenar();
  }


  async llenar() {
    this.item = await this.itemService.ObtenerItem(this.id_item);
    this.sucursal = await this.sucursalService.obtenerSucursalItem(this.id_sucursal);
    this.empleados_comercio = await this.itemService.ObtenerEmpleados(this.sucursal.idComercio)

    for (let i = 0; i < this.empleados_comercio.length; i++) {
      if (this.empleados_comercio[i].IdSucursal == this.id_sucursal) {
        this.empleados_sucursal.push(this.empleados_comercio[i])
      }

    }

    let tmp_comercio = new Comercio();
    tmp_comercio.id = this.sucursal.idComercio;

    this.comercioService.obtenerComercio(tmp_comercio)
      .subscribe(data => {
        this.comercio = data;
      });

  }


}
