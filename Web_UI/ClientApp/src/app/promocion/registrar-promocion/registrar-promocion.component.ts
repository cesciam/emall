import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/promocion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private router: Router,
    private service: PromocionService
  ) { }

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

    if(this.promocionForm.invalid)
      return;

      this.service.registrarPromocion(this.promocionForm.value)
      .subscribe(
        (reponse) => this.router.navigate(['promociones']),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
      }
      );
  }

}
