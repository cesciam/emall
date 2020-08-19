import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionService } from '../../services/promocion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-registrar-promocion',
  templateUrl: './registrar-promocion.component.html',
  styleUrls: ['./registrar-promocion.component.css']
})
export class RegistrarPromocionComponent implements OnInit {

  private promocionForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;

  private usuarioLogueado: string;
  public accion: string = "Creación Promoción";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private bitacora: BitacoraService,
    private router: Router,
    private service: PromocionService
  ) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
   }

  ngOnInit() {
    this.promocionForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      porcentaje: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.promocionForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.promocionForm.invalid)
      return;

    this.service.registrarPromocion(this.promocionForm.value)
      .subscribe(
        (reponse) => this.router.navigate(['/dashboard-admin/promocion']),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        }
    );
    this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
  }
}
