import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Item } from '../../models/item';
import { Impuesto } from '../../models/impuesto.model';
import { ItemService } from '../../services/item.service';
import { SucursalService } from '../../services/sucursal.service';
import { Router } from "@angular/router";
import { Sucursal } from '../../models/Sucursal';
import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../../models/Comercio';
import { ComercioService } from '../../services/comercio.service';

@Component({
  selector: 'app-item-perfil',
  templateUrl: './item-perfil.component.html',
  styleUrls: ['./item-perfil.component.css']
})
export class ItemPerfilComponent implements OnInit {

  item_seleccionado: Item;
  impuesto: Impuesto;
  sucursal: Sucursal;
  comercio: Comercio;
  error: any;
  preciofinal = 0;


  constructor(private route: ActivatedRoute, private serviceItem: ItemService, private router: Router, private serviceSucursal: SucursalService, private serviceComercio: ComercioService,) {

    let itemID: number = parseInt(this.route.snapshot.params['id_item']);

    this.obtenerItem(itemID);
    
  }

  ngOnInit() {
  }

  async obtenerItem(itemId: number) {
    this.item_seleccionado = await this.serviceItem.ObtenerItem(itemId);
    this.impuesto = await this.serviceItem.ObtenerImpuestoItem(this.item_seleccionado.id_impuesto);
    this.sucursal = await this.serviceSucursal.obtenerSucursalItem(this.item_seleccionado.id_sucursal);

    let tmp_comercio = new Comercio();
    tmp_comercio.id = this.sucursal.idComercio;

    this.serviceComercio.obtenerComercio(tmp_comercio)
      .subscribe(data => {
        this.comercio = data;
      });
    console.log(this.comercio)

    this.preciofinal = this.item_seleccionado.precio + (this.item_seleccionado.precio / 100 * this.impuesto.Porcentaje);
  }

}
