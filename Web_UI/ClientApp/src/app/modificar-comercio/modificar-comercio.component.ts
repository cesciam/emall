import { Component, OnInit, Input } from '@angular/core';
import { ComercioService } from '../services/comercio.service';
import { Comercio } from '../models/Comercio';
import { Archivo } from '../models/Archivo';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
import cloudinaryConfig from '../config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-comercio',
  templateUrl: './modificar-comercio.component.html',
  styleUrls: ['./modificar-comercio.component.css']
})
export class ModificarComercioComponent implements OnInit {
  private comercioService: ComercioService;
  @Input() comercioSeleccionado: Comercio;
  private error: any;
  private logo: string;
  private uploader: CloudinaryUploader;

  constructor(comercioService: ComercioService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.comercioService = comercioService;
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.comercioSeleccionado = new Comercio();
  }

  ngOnInit() {
    this.llenarComercio();
  }

  llenarComercio() {
    let idComercio: number = this.activatedRoute.snapshot.queryParams['comercio'];
    let comercio = new Comercio();
    comercio.id = idComercio;

    this.comercioService.obtenerComercio(comercio)
      .subscribe(data => {
        this.comercioSeleccionado = data
        this.logo = this.comercioSeleccionado.archivos[0].enlace;
      });
  }

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      var archivo = new Archivo();
      archivo.nombre = 'logo';
      archivo.tipo = '1';
      archivo.enlace = res.url;
      this.logo = res.url;
      this.comercioSeleccionado.archivos[0] = archivo;
      return res;
    };
  }

  modificarComercio() {

    this.comercioService.modificarComercio(this.comercioSeleccionado)
       .subscribe(
         (response) => {
           this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.comercioSeleccionado.id } });
        },
        (error) => {
          console.log(error);
          this.error = error.error;
          window.scroll(0, 0);
        });
    
  }

}
