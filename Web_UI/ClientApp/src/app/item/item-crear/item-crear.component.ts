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

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
     
      this.foto = res.url;
      console.log(this.foto);
      return res;
    };
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

    

    for (let i = 0; i < this.sucursalesSeleccionadas.length; i++) {

      let value = this.sucursalesSeleccionadas[i];
      var tmp_inventario = (document.getElementById("inventario" + value)) as HTMLInputElement;
      this.item.inventario = Number(tmp_inventario.value);
      this.item.id_sucursal = this.sucursalesSeleccionadas[i];
      this.item.id_foto = this.foto;
      var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
      var sel = e.selectedIndex;

      if (sel == -1) {
        this.error = "Errores en el impuesto";
      } else {
        this.item.id_impuesto = this.impuestos[(sel)].Id;
      }


      console.log(this.item);
      this.service.crearItem(this.item)
        .subscribe(
          (reponse) => {
            this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.comercio } });
          },
          (error) => {
            this.error = "Errores en el registro";
            window.scroll(0, 0);
          });

    }



    
  }

  





}

