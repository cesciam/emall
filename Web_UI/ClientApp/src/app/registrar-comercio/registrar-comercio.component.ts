import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comercio } from '../models/Comercio';
import { getBaseUrl } from '../../main';
import { Categoria } from '../models/Categoria';
import { ComercioService } from '../services/comercio.service';
import { async } from '@angular/core/testing';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
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
  private http: HttpClient;

  constructor(comercioService: ComercioService, private cloudinary: Cloudinary, private zone: NgZone,  http: HttpClient) {
    this.http = http;
    this.comercioService = comercioService;
    this.comercio = new Comercio();
    this.comercio.archivos = new Array();
    this.comercio.categorias = new Array();
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.logo = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.imagenHacienda = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.imagenSalud = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
  }

  async llenarCategorias() {
    this.categoriasList = await this.comercioService.ObtenerTodoCategorias();
  }

  ngOnInit(): void {
    this.llenarCategorias();

    /*
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );*/
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
    let endpoint = getBaseUrl() + 'comercio/crearcomercio';

    this.http.post(endpoint, this.comercio).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }


}
