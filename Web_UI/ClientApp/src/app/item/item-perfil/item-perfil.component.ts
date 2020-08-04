import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/item';
import { getBaseUrl } from '../../../main';
import { Impuesto } from '../../models/impuesto.model';
import { ItemService } from '../../services/item.service';
import { SucursalService } from '../../services/sucursal.service';
import { ImpuestoService } from '../../services/impuesto.service';
import { async } from '@angular/core/testing';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Cloudinary } from '@cloudinary/angular-5.x';
import cloudinaryConfig from '../../config';
import { Archivo } from '../../models/Archivo';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Sucursal } from '../../models/Sucursal';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'ts-node';

@Component({
  selector: 'app-item-perfil',
  templateUrl: './item-perfil.component.html',
  styleUrls: ['./item-perfil.component.css']
})
export class ItemPerfilComponent implements OnInit {

  item_seleccionado: Item;
  impuesto: Impuesto;
  sucursal: Sucursal;
  error: any;
  preciofinal = 0;


  constructor(private route: ActivatedRoute, private serviceItem: ItemService, private router: Router, private serviceSucursal: SucursalService,) {

    let itemID: number = parseInt(this.route.snapshot.params['id_item']);

    this.obtenerItem(itemID);
    
  }

  ngOnInit() {
  }

  async obtenerItem(itemId: number) {
    this.item_seleccionado = await this.serviceItem.ObtenerItem(itemId);
    this.impuesto = await this.serviceItem.ObtenerImpuestoItem(this.item_seleccionado.id_impuesto);
    this.sucursal = await this.serviceSucursal.obtenerSucursalItem(this.item_seleccionado.id_sucursal);


    this.preciofinal = this.item_seleccionado.precio + (this.item_seleccionado.precio / 100 * this.impuesto.Porcentaje);
  }

}
