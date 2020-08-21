import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { equalValueValidator } from '../../../helpers/equal-value.validator';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Cloudinary } from '@cloudinary/angular-5.x';
import cloudinaryConfig from '../../../config';
import { RegistroUsuario } from '../../../models/registro-usuario.model';
import { Archivo } from '../../../models/Archivo';
import { BitacoraService } from '../../../services/bitacora.service';

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
  private foto: Archivo;
  private isSendingData: boolean = false;
  private usuarioLogueado: string;
  public accion: string = "Creación usuario";

  public id_usuario: 0; 
      
  constructor(private bitacora: BitacoraService,
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
      Tipo: new FormControl(this.integrarCon == 'pagina' ? '2' : '', [Validators.required]),
      Foto: new FormControl('', [Validators.pattern(/.*\.(gif|jpeg|jpg|bmp|png|webp|tiff|eps)$/igm)])
    }, {
        validators: equalValueValidator('Contrasena', 'ContrasenaConfirmar')
    });
  }

  validarFoto(files: any) {
    this.imgUrl = '';

    if (!this.usuarioForm.controls['Foto'].errors) {
      if (files.length === 0)
        return;

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      };
    }
  }

  subirFoto() {
    const upload = new Promise((resolve, reject) => {
      this.uploader.uploadAll();

      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
        let res = JSON.parse(response);

        this.foto = new Archivo();
        this.foto.enlace = res.url;
        this.foto.nombre = res.original_filename + '.' + res.format;
        this.foto.tipo = 'Foto';

        resolve();
      }
    });

    return upload;
  }

  get f() {
    return this.usuarioForm.controls;
  }

  sanitizeData(data: FormGroup): RegistroUsuario {
    let nuevoUsuario: RegistroUsuario = new RegistroUsuario();

    nuevoUsuario.Nombre = this.usuarioForm.controls['Nombre'].value;
    nuevoUsuario.Apellido = this.usuarioForm.controls['Apellido'].value;
    nuevoUsuario.Cedula = this.usuarioForm.controls['Cedula'].value;
    nuevoUsuario.Contrasena = this.usuarioForm.controls['Contrasena'].value;
    nuevoUsuario.Correo = this.usuarioForm.controls['Correo'].value;
    nuevoUsuario.Foto = this.foto;
    nuevoUsuario.Telefono = this.usuarioForm.controls['Telefono'].value;
    
    let type: number = +this.usuarioForm.controls['Tipo'].value;
    nuevoUsuario.Tipo = type;

    return nuevoUsuario;
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.sanitizeData(this.usuarioForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;

          if (this.integrarCon == null)
            this.router.navigate(['dashboard-admin/usuario/listar-usuario']);
          else {
            window.scroll(0, 0);
            this.registerComplete = true;
          }
          this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
            (error) => {
              this.error = error.error;
              window.scroll(0, 0);
            });
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al registrar el usuario. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);
        });
  }

  onSubmit() {
    this.submitted = true;

    if (this.usuarioForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    if (this.usuarioForm.controls['Foto'].value != '') {
      this.subirFoto()
        .then(() => {
          this.isSendingData = true;
          this.registrarUsuario();
        });
    } else {
      this.registrarUsuario();
    }
  }
}
