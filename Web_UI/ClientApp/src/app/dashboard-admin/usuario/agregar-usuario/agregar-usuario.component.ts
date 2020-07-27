import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RegistroUsuario } from '../../../models/registro-usuario.model';
import { equalValueValidator } from '../../../helpers/equal-value.validator';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})

export class AgregarUsuarioComponent implements OnInit {
  private usuarioForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
      
  constructor(
    private router: Router,
    private usuarioService: UsuarioService) {
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
      Tipo: new FormControl('2', [Validators.required])
    }, {
        validators: equalValueValidator('Contrasena', 'ContrasenaConfirmar')
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  sanitizeData(): void {
    //Transforma el dato 'Tipo' de string a number
    let type: number = +this.usuarioForm.controls['Tipo'].value;
    this.usuarioForm.controls['Tipo'].setValue(type);
  }

  onSubmit() {
    this.submitted = true;

    if (this.usuarioForm.invalid)
      return;

    this.sanitizeData();

    this.usuarioService.registrarUsuario(this.usuarioForm.value)
      .subscribe(
        (response) => {
          this.router.navigate(['dashboard-admin/usuario/listar-usuario']);
      },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
      });
  }
}
