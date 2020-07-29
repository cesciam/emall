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
  selector: 'app-item-crear',
  templateUrl: './item-crear.component.html',
  styleUrls: ['./item-crear.component.css']
})



export class ItemCrearComponent implements OnInit {

  sucursal: Sucursal;
  message: string;
  impuestos: number[];
  item: Item;


  uploader: CloudinaryUploader;
  private foto: string;



  constructor(private service: ItemService) {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada'))
    this.impuestos = [1, 2, 3]
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.foto = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.item = new Item();
    this.sucursal = new Sucursal();
    this.sucursal.id = 1;
  }





  ngOnInit() {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionada'))
    this.impuestos = [1, 2, 3]
    this.sucursal = new Sucursal();
    this.sucursal.id = 1;


  }


  crearItem() {
    this.item.id_impuesto = Number(this.item.id_impuesto)
    //this.item.id_foto = 1;
    this.item.id_sucursal = this.sucursal.id;
    console.log(this.item);
    console.log(this.foto);
    this.service.crearItem(this.item, this.foto)
      .subscribe(
        (data: any) => console.log(data),
        (err: any) => console.log(err)
      );
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



//export class ItemCrearComponent implements OnInit {


//  uploader: CloudinaryUploader;
//  itemService: ItemService;
//  item: Item;
//  foto: string;
//  impuestos: Impuesto[];


//  itemForm: FormGroup;
//  submitted: boolean = false;
//  error: object = null;

//  sucursal: Sucursal;


//  constructor(private servicio: ItemService, private route: Router) { }

//  ngOnInit() {

//    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccionado'));



//    this.itemForm = new FormGroup({
//      Inventario: new FormControl('', [Validators.required, Validators.min(1)]),
//      Nombre: new FormControl('', [Validators.required]),
//      Descripcion: new FormControl('', [Validators.required]),
//      Precio: new FormControl('', [Validators.required]),
//      Id_Sucursal: new FormControl('', [Validators.required]),
//      Duracion: new FormControl('', [Validators.required]),
//      Tipo: new FormControl('', [Validators.required]),
//      Id_Impuesto: new FormControl('', [Validators.required]),
//      Id_Foto: new FormControl('', [Validators.required]),

//    });

//  }


//  get f() {
//    return this.itemForm.controls;
//  }

//  //sanitizeData(): void {
//  //  //Transforma el dato 'Tipo' de string a number
//  //  let type: number = +this.usuarioForm.controls['Tipo'].value;
//  //  this.usuarioForm.controls['Tipo'].setValue(type);
//  //}

//  onSubmit() {
//    this.submitted = true;

//    if (this.itemForm.invalid)
//      return;

//    //this.sanitizeData();

//    this.servicio.crearItem(this.itemForm.value)
//      .subscribe(
//        (response) => {
//          this.route.navigate(['***']);
//        },
//        (error) => {
//          this.error = error.error;
//          window.scroll(0, 0);
//        });
//  }


//}
