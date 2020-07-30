import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { Impuesto } from 'src/app/models/impuesto.model';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {

  constructor(private service: ImpuestoService) { }

  ngOnInit() {

  }

  public crear(impuesto: Impuesto) {
    this.service.crearImpuesto(impuesto); 
  }

}
