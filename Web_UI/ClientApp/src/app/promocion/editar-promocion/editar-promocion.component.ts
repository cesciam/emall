import { Component, OnInit } from '@angular/core';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../services/promocion.service';
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
  }

  save() {
    this.service.editar(this.promocionSeleccionada)
    .subscribe(
      (data: any) => { 
        console.log('editado');
        this.router.navigate(['/dashboard-admin/promocion']);
      },
      (err: any) => console.log(err)
    );
  }
}
