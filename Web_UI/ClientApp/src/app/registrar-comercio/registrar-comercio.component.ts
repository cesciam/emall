import { Component, OnInit, Input } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { Categoria } from '../models/categoria.model';
import { ComercioService } from '../services/comercio.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Cloudinary } from '@cloudinary/angular-5.x';
import cloudinaryConfig from '../config';
import { Archivo } from '../models/Archivo';

@Component({
  selector: 'app-registrar-comercio',
  templateUrl: './registrar-comercio.component.html',
  styleUrls: ['./registrar-comercio.component.css']
})
export class RegistrarComercioComponent implements OnInit {

  private uploader: CloudinaryUploader;

  private categoriasList: Categoria[];
  private comercioService: ComercioService;
  @Input() comercio: Comercio;
  private logo: string;
  private imagenSalud: string;
  private imagenHacienda: string;
  @Input() txtCategoria: string;
  private error: any;

  constructor(comercioService: ComercioService, private cloudinary: Cloudinary) {
    this.comercioService = comercioService;
    this.comercio = new Comercio();
    this.comercio.archivos = new Array();
    this.comercio.categorias = new Array();
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.logo = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.imagenHacienda = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.imagenSalud = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.error = null;
  }

  llenarCategorias() {
    this.comercioService.ObtenerTodoCategorias()
      .subscribe(data => this.categoriasList = data);
  }

  ngOnInit(): void {
    this.llenarCategorias();
    this.inicializarComercio();
  }

  inicializarComercio() {
    let usuarioLogeado = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.comercio.idAdmin = usuarioLogeado.usuario.Id;

    console.log(this.comercio);
  }

  upload(nombre: string, tipo: string) {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      var archivo = new Archivo();
      archivo.nombre = nombre;
      archivo.tipo = tipo;
      archivo.enlace = res.url;

      switch (nombre) {
        case 'logo':
          this.logo = res.url;
          this.comercio.archivos[0] = archivo;
          break;
        case 'imagenHacienda':
          this.imagenHacienda = res.url;
          this.comercio.archivos[1] = archivo;
          break;
        case 'imagenSalud':
          this.imagenSalud = res.url;
          this.comercio.archivos[2] = archivo;
          break;
      }

      console.log(this.comercio);
      return res;
    };
  }


  registrarComercio() {
    this.comercio.categorias[0] = this.txtCategoria;

    this.comercioService.registrarComercio(this.comercio)
      .subscribe(
        (response) => {
          //TODO: Envíar al usuario al perfil de administrador de comercio
        },
        (error) => {
          console.log(error);
          this.error = error.error;
          window.scroll(0, 0);
        });
  }


}
