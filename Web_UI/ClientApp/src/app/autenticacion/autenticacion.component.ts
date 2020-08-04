import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
  private submitted: boolean = false;
  private submittedCodigo: boolean = false;
  private error: object = null;
  private processingRequest: boolean = false;
  private processingActivateRequest: boolean = false;
  private section: string = 'login';
  private usuario: Usuario;
  private response: any;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      Correo: new FormControl('mmartinezr@ucenfotec.ac.cr', [Validators.required, Validators.email]),
      Contrasena: new FormControl('Michael123@', [Validators.required]),
    });

    this.activateForm = new FormGroup({
      Codigo: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get fc() {
    return this.activateForm.controls;
  }

  changeSection(section: string): void {
    this.section = section;
    window.scroll(0, 0);
  }

  refreshPage() {
    this.router.navigateByUrl('/');
  }

  onActivate() {
    this.submittedCodigo = true;

    if (this.activateForm.invalid)
      return;

    this.processingActivateRequest = true;
    this.usuarioService.activarUsuario(+this.usuario.Id, this.activateForm.controls['Codigo'].value)
      .subscribe(
        (response) => {
          localStorage.setItem('usuario-logueado', JSON.stringify(this.response));
          this.changeSection('activated');
        },
        (error) => {
          this.error = error.error;
          this.processingActivateRequest = false;
          window.scroll(0, 0);
        });
  }

  completarDatos(usuarioId: number) {

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
          this.usuario = response.usuario;
          this.response = response;

          if (this.usuario.Estado === 0) {
            this.changeSection('activate');
          } else if (this.usuario.Estado === 1) {
            localStorage.setItem('usuario-logueado', JSON.stringify(response));
            this.router.navigate[''];
          }
        },
        (error) => {
          this.error = error.error;
          this.processingRequest = false;
          window.scroll(0, 0);
        });
  }
}
