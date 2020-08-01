import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
import { Archivo } from '../models/Archivo';
import { ComercioService } from '../services/comercio.service';
import cloudinaryConfig from '../config';
import { Comercio } from '../models/Comercio';

@Component({
  selector: 'app-agregar-archivo',
  templateUrl: './agregar-archivo.component.html',
  styleUrls: ['./agregar-archivo.component.css']
})
export class AgregarArchivoComponent implements OnInit {
  private uploader: CloudinaryUploader;
  @Input() archivo: Archivo;
  private logo: string;
  private error: any;
  private comercioSeleccionado: Comercio;

  constructor(private comercioService: ComercioService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.logo = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.archivo = new Archivo();
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.comercioSeleccionado = new Comercio();
    this.comercioSeleccionado.archivos = new Array();
  }

  ngOnInit() {
    this.llenarComercio();
  }

  llenarComercio() {
    let idComercio: number = parseInt(this.activatedRoute.snapshot.queryParams['comercio']);
    this.comercioSeleccionado.id = idComercio;
  }



  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      this.archivo.tipo = '2';
      this.archivo.enlace = res.url;
      this.logo = res.url;
      this.comercioSeleccionado.archivos.push(this.archivo);

      return res;
    };
  }


  agregarArchivo() {
     this.comercioService.agregarArchivo(this.comercioSeleccionado)
      .subscribe(data => {
        this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.comercioSeleccionado.id } });
      }, error => {
          console.log(error);
          this.error = error.error;
          window.scroll(0, 0);
      });
  }

}
