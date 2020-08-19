import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-listar-promocion',
  templateUrl: './listar-promocion.component.html',
  styleUrls: ['./listar-promocion.component.css']
})
export class ListarPromocionComponent implements OnInit {
  promociones: Promocion[];
  filtroPromociones = '';

  private error: object = null;
  private usuarioLogueado: string;
  public accion: string = "Eliminación Promoción";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private bitacora: BitacoraService, private service: PromocionService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
  }

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

        this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
          (error) => {
            this.error = error.error;
            window.scroll(0, 0);
          });
      },
      (err: any) => console.log(err)
    );
  }

}
