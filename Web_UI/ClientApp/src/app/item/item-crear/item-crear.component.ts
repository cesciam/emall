import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/item';
import { getBaseUrl } from '../../../main';
//import { Impuesto } from '../../models/impuesto';
import { ItemService } from '../../services/item.service';
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
import { Impuesto } from '../../models/impuesto.model';

@Component({
  selector: 'app-item-crear',
  templateUrl: './item-crear.component.html',
  styleUrls: ['./item-crear.component.css']
})



export class ItemCrearComponent implements OnInit {

  //sucursal: Sucursal;
  sucursal: number;
  message: string;
  //impuestos: number[];
  impuestos: Impuesto[];
  item: Item;
  error: any;


  uploader: CloudinaryUploader;
  private foto: string;



  constructor(private route: ActivatedRoute, private service: ItemService, private router: Router, private serviceImpuesto: ImpuestoService) {
    //this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada'))
    this.sucursal = parseInt(this.route.snapshot.params['id_sucursal']);
    //this.impuestos = new Impuesto[];
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.foto = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.item = new Item();
    //this.sucursal = new Sucursal();
    //this.sucursal.id = 1;
  }





  ngOnInit() {
    this.sucursal = parseInt(this.route.snapshot.params['id_sucursal']);
    //this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada'))
    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
    //this.sucursal = new Sucursal();
    //this.sucursal.id = 1;


  }


  crearItem() {
    //this.item.id_impuesto = Number((document.getElementById("id_impuesto") as HTMLInputElement).value)
    //this.item.id_impuesto = Number(this.item.id_impuesto)
    //this.item.id_foto = 1;

    var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    //var opt = e.options[sel];
    //var CurValue = (<HTMLOptionElement>opt).value;
    this.item.id_impuesto = this.impuestos[(sel - 1)].Id;

    this.item.id_sucursal = this.sucursal;
    this.item.id_foto = this.foto;
    console.log(this.item.id_impuesto);
    this.service.crearItem(this.item)
      .subscribe(
        (reponse) => this.router.navigate(['item-sucursal', this.sucursal]),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
  }

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      this.foto = res.url;
      
      return res;
    };
  }





}

