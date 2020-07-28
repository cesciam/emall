import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';

@Component({
  selector: 'app-listar-promocion',
  templateUrl: './listar-promocion.component.html',
  styleUrls: ['./listar-promocion.component.css']
})
export class ListarPromocionComponent implements OnInit {
  promociones: Promocion[];

  constructor(private service: PromocionService) { }

  ngOnInit() {
    this.service.obtenerPromociones()
    .subscribe(
      (data: Promocion[]) => this.promociones = data,
      (err: any) => console.log(err)
    );
  }

  eliminar(id: number): void {
    this.service.eliminar(id)
    .subscribe(
      (data: void) => {
        let index: number = this.promociones.findIndex(promocion => promocion.id === id);
        this.promociones.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
  }

}
