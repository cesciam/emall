import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { equalValueValidator } from '../../../helpers/equal-value.validator';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Cloudinary } from '@cloudinary/angular-5.x';
import cloudinaryConfig from '../../../config';
import { Archivo } from '../../../models/Archivo';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { RegistroUsuario } from '../../../models/registro-usuario.model';
import { DashboardAdminComponent } from '../../dashboard-admin.component';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})

export class AgregarUsuarioComponent implements OnInit {
  @Input() integrarCon: string;
  
  private usuarioForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;
  private uploader: CloudinaryUploader;
  private imgUrl: any;
  private archivo: Archivo;
      
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private cloudinary: Cloudinary) {
    this.uploader = new CloudinaryUploader(
      new CloudinaryOptions({
        cloudName: cloudinaryConfig.cloud_name,
        uploadPreset: cloudinaryConfig.upload_preset
      })
    );
  }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      Cedula: new FormControl('', [Validators.required, Validators.minLength(9)]),
      Nombre: new FormControl('', [Validators.required]),
      Apellido: new FormControl('', [Validators.required]),
      Correo: new FormControl('', [Validators.required, Validators.email]),
      Contrasena: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      ContrasenaConfirmar: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      Telefono: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required]),
      Foto: new FormControl('', [Validators.pattern(/.*\.(gif|jpe?g|bmp|png|webp|tiff|eps)$/igm)])
    }, {
        validators: equalValueValidator('Contrasena', 'ContrasenaConfirmar')
    });
  }

  validarFoto(files) {
    if (!this.usuarioForm.controls['Foto'].errors) {
      if (files.length === 0) {
        this.imgUrl = '';
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      }
    } else {
      this.imgUrl = '';
    }
  }

  subirFoto():boolean {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res = JSON.parse(response);

      this.archivo = new Archivo();
      this.archivo.enlace = res.url;
      this.archivo.nombre = this.usuarioForm.controls['Foto'].value;
      this.archivo.tipo = 'Foto';

      return true;
    };

    return false;
  }

  get f() {
    return this.usuarioForm.controls;
  }

  sanitizeData(data: FormGroup): RegistroUsuario {
    let nuevoUsuario: RegistroUsuario;

    nuevoUsuario.Nombre = this.usuarioForm.controls['Nombre'].value;
    nuevoUsuario.Apellido = this.usuarioForm.controls['Apellido'].value;
    nuevoUsuario.Cedula = this.usuarioForm.controls['Cedula'].value;
    nuevoUsuario.Contrasena = this.usuarioForm.controls['Contrasena'].value;
    nuevoUsuario.Correo = this.usuarioForm.controls['Correo'].value;
    nuevoUsuario.Imagen = this.archivo;
    nuevoUsuario.Telefono = this.usuarioForm.controls['Telefono'].value;
    nuevoUsuario.Tipo = +this.usuarioForm.controls['Tipo'].value;

    return nuevoUsuario;
  }

  onSubmit() {
    console.log('submitted');
    this.submitted = true;

    if (this.usuarioForm.invalid)
      return;

    if (this.subirFoto())
      this.usuarioService.registrarUsuario(this.sanitizeData(this.usuarioForm))
      .subscribe(
        (response) => {
          if (this.integrarCon == null)
            this.router.navigate(['dashboard-admin/usuario/listar-usuario']);
          else {
            window.scroll(0, 0);
            this.registerComplete = true;
          }
      },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
      });
  }
}
