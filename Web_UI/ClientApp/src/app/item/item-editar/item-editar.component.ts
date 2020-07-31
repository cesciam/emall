import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/item';
import { getBaseUrl } from '../../../main';
//import { Impuesto } from '../../models/impuesto';
import { ItemService } from '../../services/item.service';
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
  selector: 'app-item-editar',
  templateUrl: './item-editar.component.html',
  styleUrls: ['./item-editar.component.css']
})
export class ItemEditarComponent implements OnInit {

  item_seleccionado: Item;
  item_archivo: Archivo;
  impuestos: number[];
  uploader: CloudinaryUploader;


  constructor(private route: ActivatedRoute, private service: ItemService) {
    //this.item_seleccionado = new Item();
    //this.item_archivo = new Archivo();
    this.impuestos = [1, 2, 3]
    let itemID: number = parseInt(this.route.snapshot.params['id_item']);

    this.obtenerItem(itemID);
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    //console.log(this.item_archivo.enlace);

    //this.service.getItemArchivo(this.item_seleccionado.id_foto)
    //  .subscribe(
    //    (data: Archivo) =>
    //      this.item_foto = data,
    //    (err: any) => console.log(err)
    //);

    //console.log(this.item_foto);



  }

  async obtenerItem(itemId: number) {
    this.item_seleccionado = await this.service.ObtenerItem(itemId);
    //this.item_archivo = await this.service.ObtenerArchivo(this.item_seleccionado.id_foto);
  }


  ngOnInit() {
    

  }

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      this.item_seleccionado.id_foto = res.url;

      return res;
    };
  }


  save(): void {


    //this.service.updateArchivo(this.item_archivo)
    //  .subscribe(
    //    (data: any) => console.log('Archivo was updated'),
    //    (err: any) => console.log(err)
    //  );

    this.item_seleccionado.id_impuesto = Number(this.item_seleccionado.id_impuesto)

    this.service.updateItem(this.item_seleccionado)
      .subscribe(
        (data: any) => console.log('Item was updated'),
        (err: any) => console.log(err)
      );
  }


}
