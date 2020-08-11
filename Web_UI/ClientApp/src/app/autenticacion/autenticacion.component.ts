import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
})

export class AutenticacionComponent implements OnInit {
  private loginForm: FormGroup;
  private activateForm: FormGroup;
  private resetForm: FormGroup;
  private submitted: boolean = false;
  private submittedCodigo: boolean = false;
  private submittedReset: boolean = false;
  private error: object = null;
  private processingRequest: boolean = false;
  private processingActivateRequest: boolean = false;
  private processingResetRequest: boolean = false;
  private section: string = 'login';
  private usuario: Usuario;
  private response: any;
  private seccionParam: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.seccionParam = this.route.snapshot.paramMap.get('seccion');

    if (this.seccionParam != null || this.seccionParam != '') {
      this.changeSection(this.seccionParam);
    }

    this.loginForm = new FormGroup({
      Correo: new FormControl('', [Validators.required, Validators.email]),
      Contrasena: new FormControl('', [Validators.required]),
    });

    this.activateForm = new FormGroup({
      Codigo: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.resetForm = new FormGroup({
      CorreoReset: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get fc() {
    return this.activateForm.controls;
  }

  get fr() {
    return this.resetForm.controls;
  }

  changeSection(section: string): void {
    this.section = section;
    window.scroll(0, 0);
  }

  refreshPage() {
    this.router.navigate(['']);
  }

  onActivate() {
    this.submittedCodigo = true;

    if (this.activateForm.invalid)
      return;

    this.processingActivateRequest = true;
    this.usuarioService.activarUsuario(+this.usuario.Id, this.activateForm.controls['Codigo'].value)
      .subscribe(
        (response) => {
          this.processingActivateRequest = false;

          console.log(this.usuario);

          if (this.usuario.Tipo === 4 && this.usuario.Nombre == '' && this.usuario.Apellido == '') {
            this.changeSection('fillData');
          } else {
            localStorage.setItem('usuario-logueado', JSON.stringify(this.response));
            this.changeSection('activated');
          }
        },
        (error) => {
          this.processingActivateRequest = false;
          this.error = error.error;
          window.scroll(0, 0);
        });
  }

  onRestablecerContrasena() {
    this.submittedReset = true;

    if (this.resetForm.invalid)
      return;

    this.processingResetRequest = true;

    this.usuarioService.restablecerContrasena(this.resetForm.controls['CorreoReset'].value)
      .subscribe(
        (response) => {
          this.changeSection('reseted');
        },
        (error) => {
          this.processingResetRequest = false;
          this.error = error.error;
          window.scroll(0, 0);
        });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    this.processingRequest = true;
    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        (response) => {
          this.usuario = response['usuario'];
          this.response = response;

          if (this.usuario.Estado === 0) {
            this.changeSection('activate');
          } else if (this.usuario.Estado === 1) {
            if (this.usuario.Tipo === 4 && this.usuario.Nombre == '' && this.usuario.Apellido == '') {
              this.changeSection('fillData');
            } else {
              localStorage.setItem('usuario-logueado', JSON.stringify(response));
              this.router.navigate(['']);
            }
          }
        },
        (error) => {
          this.error = error.error;
          this.processingRequest = false;
          window.scroll(0, 0);
        });
  }
}
