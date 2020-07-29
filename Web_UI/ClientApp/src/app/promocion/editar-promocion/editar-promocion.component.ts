import { Component, OnInit } from '@angular/core';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.component.html',
  styleUrls: ['./editar-promocion.component.css']
})
export class EditarPromocionComponent implements OnInit {
  /*private promocionForm: FormGroup;*/

  promocionSeleccionada: Promocion;
  idPromocion: number;

  constructor(private route: ActivatedRoute, 
    private service: PromocionService,
    private router: Router) { 
    this.idPromocion = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.service.obtenerPromocion(this.idPromocion)
    .subscribe(
      (data: Promocion) => this.promocionSeleccionada = data,
      (err: any) => console.log(err)
    );

    /*this.promocionForm = new FormGroup({
      nombre: new FormControl( this.promocionSeleccionada.nombre, Validators.required)
    });*/
  }

  save() {
    this.service.editar(this.promocionSeleccionada)
    .subscribe(
      (data: any) => console.log(data),
      (err: any) => console.log(err)
    );
    
    this.router.navigate['../../promociones'];
  }

}
