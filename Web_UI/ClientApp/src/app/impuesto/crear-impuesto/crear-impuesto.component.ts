import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { Impuesto } from 'src/app/models/impuesto.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {

  private impuestoForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  public crearImpuesto: Impuesto = { Id: 0, Nombre: '', Porcentaje: null };

  constructor(private router: Router,private service: ImpuestoService) { }

  ngOnInit() {
    this.impuestoForm = new FormGroup({
      Nombre: new FormControl('', Validators.required),
      Porcentaje: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.impuestoForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.impuestoForm.invalid)
      return;

    this.service.crearImpuesto(this.impuestoForm.value)
      .subscribe(
        (reponse) => this.router.navigate(['crear-impuesto']),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        }
      );
  }

}
