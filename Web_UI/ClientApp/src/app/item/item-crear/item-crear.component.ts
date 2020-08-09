import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/item';
import { getBaseUrl } from '../../../main';
import { ItemService } from '../../services/item.service';
import { ImpuestoService } from '../../services/impuesto.service';
import { SucursalService } from '../../services/sucursal.service';
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
import { Comercio } from '../../models/Comercio';

@Component({
  selector: 'app-item-crear',
  templateUrl: './item-crear.component.html',
  styleUrls: ['./item-crear.component.css']
})



export class ItemCrearComponent implements OnInit {

  
  sucursal: number;
  message: string;
  impuestos: Impuesto[];
  item: Item;
  error: any;
  sucursales: Sucursal[];
  comercio: number;
  tipo: number;
  sucursalesSeleccionadas: Array<number>;


  uploader: CloudinaryUploader;
  private foto: string;



  constructor(private route: ActivatedRoute, private service: ItemService, private router: Router, private serviceImpuesto: ImpuestoService, private serviceSucursal: SucursalService) {
    this.comercio = parseInt(this.route.snapshot.params['id_comercio']);
    this.sucursalesSeleccionadas = new Array<number>();



    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.foto = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.item = new Item();
  }


  llenar() {
    this.serviceSucursal.ObtenerTodoSucursales(this.comercio)
      .subscribe(data => this.sucursales = data);
    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
  }

  marcar(e: any, id: number) {
    console.log(id);
    if (e.target.checked) {
      this.sucursalesSeleccionadas.push(id)
    } else {
      this.sucursalesSeleccionadas = this.sucursalesSeleccionadas.filter(m => m != id)
    }
    console.log(this.sucursalesSeleccionadas);
  }


  ngOnInit() {
    this.llenar();


  }


  crearItem() {
    //this.item.id_impuesto = Number((document.getElementById("id_impuesto") as HTMLInputElement).value)
    //this.item.id_impuesto = Number(this.item.id_impuesto)
    //this.item.id_foto = 1;

    var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
    console.log(e);
    var sel = e.selectedIndex;

    if (sel == -1) {
      this.error = "Errores en el impuesto";
    } else {
      this.item.id_impuesto = this.impuestos[(sel - 1)].Id;
      console.log(this.item.id_impuesto);
    }


    //var opt = e.options[sel];
    //var CurValue = (<HTMLOptionElement>opt).value;
    //this.item.id_impuesto = this.impuestos[(sel - 1)].Id;

    this.item.id_sucursal = this.sucursal;
    this.item.id_foto = this.foto;
    console.log(this.item.id_impuesto);
    this.service.crearItem(this.item)
      .subscribe(
        (reponse) => this.router.navigate(['item-sucursal', this.sucursal]),
        (error) => {
          this.error = "Errores en el registro";
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

