import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { equalValueValidator } from '../../../helpers/equal-value.validator';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Cloudinary } from '@cloudinary/angular-5.x';
import cloudinaryConfig from '../../../config';
import { Archivo } from '../../../models/Archivo';
import { Usuario } from '../../../models/usuario.model'

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {
  @Input() id: number;
  @Input() integrarCon: string;
  @Input() titulo: string;

  private usuarioForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private editComplete: boolean = false;
  private uploader: CloudinaryUploader;
  private imgUrl: any;
  private foto: Archivo;
  private isSendingData: boolean = false;
  private usuario: Usuario;
  private tituloAMostrar: string = 'Usuarios';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.obtenerDatosUsuario().then(() => {
      let esCedulaValida = /^\d+$/.test(this.usuario.Cedula);

      if (esCedulaValida)
        this.usuarioForm.controls['Cedula'].setValue(this.usuario.Cedula);
        
      this.usuarioForm.controls['Nombre'].setValue(this.usuario.Nombre);
      this.usuarioForm.controls['Apellido'].setValue(this.usuario.Apellido);
      this.usuarioForm.controls['Correo'].setValue(this.usuario.Correo);
      this.usuarioForm.controls['Telefono'].setValue(this.usuario.Telefono);
      this.usuarioForm.controls['Tipo'].setValue(this.usuario.Tipo);

      if (this.integrarCon == null) {
        this.tituloAMostrar = 'Usuarios';
      } else if (this.integrarCon == 'pagina') {
          this.tituloAMostrar = this.titulo;
      } else {
        this.tituloAMostrar = 'Usuarios';
      }

      if (this.titulo != '' || this.titulo != null)
        this.tituloAMostrar = this.titulo;
      else
        this.tituloAMostrar = 'Usuarios';
    });
  }

  obtenerDatosUsuario() {
    let usuarioId: number;

    if (this.id != null)
      usuarioId = this.id;
    else
      usuarioId = +this.route.snapshot.paramMap.get('id');

    const obtenerDatos = new Promise((resolve, reject) => {
      this.usuarioService.obtenerUsuarioPorId(usuarioId)
        .subscribe(data => {
          this.usuario = data;

          if (data.Foto != null) {
            this.imgUrl = data.Foto.enlace;
            this.foto = data.Foto;
          } else {
            this.imgUrl = null;
            this.foto = null;
          }

          resolve();
        }, (error) => {
            reject();
        });
    });

    return obtenerDatos;
  }

  validarFoto(files) {
    this.imgUrl = '';

    if (!this.usuarioForm.controls['Foto'].errors) {
      if (files.length === 0)
        return;

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      }
    }
  }

  subirFoto() {
    const upload = new Promise((resolve, reject) => {
      this.uploader.uploadAll();

      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
        let res = JSON.parse(response);
        let oldIdFoto: number;

        if (this.foto == null)
          oldIdFoto = 0;
        else
          oldIdFoto = this.foto.id;

        this.foto = new Archivo();
        this.foto.id = oldIdFoto;
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

  sanitizeData(data: FormGroup): Usuario {
    let usuarioEditado: Usuario = new Usuario();

    usuarioEditado.Id = this.usuario.Id;
    usuarioEditado.Nombre = this.usuarioForm.controls['Nombre'].value;
    usuarioEditado.Apellido = this.usuarioForm.controls['Apellido'].value;
    usuarioEditado.Cedula = this.usuarioForm.controls['Cedula'].value;
    usuarioEditado.Correo = this.usuarioForm.controls['Correo'].value;
    usuarioEditado.Telefono = this.usuarioForm.controls['Telefono'].value;

    let tipo: number = +this.usuarioForm.controls['Tipo'].value;
    usuarioEditado.Tipo = tipo;

    if (this.usuarioForm.controls['Foto'].value == '')
      usuarioEditado.Foto = null;
    else
      usuarioEditado.Foto = this.foto;

    if (this.usuarioForm.controls['Contrasena'].value == "")
      usuarioEditado.Contrasena = null;
    else
      usuarioEditado.Contrasena = this.usuarioForm.controls['Contrasena'].value;

    return usuarioEditado;
  }

  editarUsuario() {
    this.usuarioService.editarUsuario(this.sanitizeData(this.usuarioForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;

          if (this.integrarCon == null)
            this.router.navigate(['dashboard-admin/usuario/listar-usuario']);
          else {
            window.scroll(0, 0);
            this.editComplete = true;
          }
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al editar el usuario. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);
        });
  }

  onSubmit() {
    this.submitted = true;

    let contrasena = this.usuarioForm.controls['Contrasena'];
    let contrasena2 = this.usuarioForm.controls['ContrasenaConfirmar'];

    if (contrasena.value === '' && contrasena2.value === '') {
      contrasena.setErrors(null);
      contrasena2.setErrors(null);
    }

    if (this.usuarioForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    if (this.usuarioForm.controls['Foto'].value != '') {
      this.subirFoto()
        .then(() => {
          this.isSendingData = true;
          this.editarUsuario();
        });
    } else {
      this.editarUsuario();
    }
  }
}
