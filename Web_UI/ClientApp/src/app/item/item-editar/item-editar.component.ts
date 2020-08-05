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
import { Impuesto } from '../../models/impuesto.model';
import { ImpuestoService } from '../../services/impuesto.service';

@Component({
  selector: 'app-item-editar',
  templateUrl: './item-editar.component.html',
  styleUrls: ['./item-editar.component.css']
})
export class ItemEditarComponent implements OnInit {

  item_seleccionado: Item;
  item_archivo: Archivo;
  impuestos: Impuesto[];
  uploader: CloudinaryUploader;
  error: any;
  stringImpuesto: string;
  impuestoactual: Impuesto;


  constructor(private route: ActivatedRoute, private service: ItemService, private router: Router, private serviceImpuesto: ImpuestoService) {
    
    let itemID: number = parseInt(this.route.snapshot.params['id_item']);
    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
    this.obtenerItem(itemID);
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));

    



  }

  async obtenerItem(itemId: number) {
    this.item_seleccionado = await this.service.ObtenerItem(itemId);
    this.impuestoactual = await this.service.ObtenerImpuestoItem(this.item_seleccionado.id_impuesto);

    //this.e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
    
    //this.e.selectedIndex = 1;


  }


  ngOnInit() {

    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
    

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




    var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    //var opt = e.options[sel];
    //var CurValue = (<HTMLOptionElement>opt).value;
    this.item_seleccionado.id_impuesto = this.impuestos[(sel - 1)].Id;
    console.log(this.item_seleccionado.id_impuesto);
    //this.item_seleccionado.id_impuesto = Number(this.item_seleccionado.id_impuesto)

    this.service.updateItem(this.item_seleccionado)
      .subscribe(
        (reponse) => this.router.navigate(['item-sucursal', this.item_seleccionado.id_sucursal]),
        (error) => {
          this.error = "Errores en el registro";
          window.scroll(0, 0);
        });
  }



}
