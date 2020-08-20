import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { Impuesto } from 'src/app/models/impuesto.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Bitacora } from '../../models/bitacora.model';
import { Usuario } from '../../models/usuario.model';
import { BitacoraService } from '../../services/bitacora.service';


@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {
  private usuarioLogueado: string;
  private impuestoForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  public crearImpuesto: Impuesto = { Id: null, Nombre: '', Porcentaje: null };
  public accion:string = "Creacion impuesto";
 
 public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private router: Router, private service: ImpuestoService, private bitacora: BitacoraService) { }

  ngOnInit() {

    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
    console.log(this.id_usuario);
 
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
    this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });

    
  }

}
