import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AgregarUsuarioComponent } from '../dashboard-admin/usuario/agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
})

export class AutenticacionComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private processingRequest: boolean = false;
  private section: string = 'login'; 

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      Correo: new FormControl('', [Validators.required, Validators.email]),
      Contrasena: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  changeSection(section: string): void {
    window.scroll(0, 0);
    this.section = section; 
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    this.processingRequest = true;
    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        (response) => {
          localStorage.setItem('usuario-logueado', JSON.stringify(response));
          window.scroll(0, 0);
          this.router.navigate(['']);
        },
        (error) => {
          this.error = error.error;
          this.processingRequest = false;
        });
  }
}
