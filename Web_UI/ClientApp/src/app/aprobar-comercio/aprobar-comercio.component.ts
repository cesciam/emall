import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { ComercioService } from '../services/comercio.service';

@Component({
  selector: 'app-aprobar-comercio',
  templateUrl: './aprobar-comercio.component.html',
  styleUrls: ['./aprobar-comercio.component.css']
})
export class AprobarComercioComponent implements OnInit {
  private comercios: Comercio[];
  private error: any;
  private filterComercio = '';

  constructor(private comercioService: ComercioService) {

  }

  ngOnInit() {
    this.llenarComercios();
  }

  llenarComercios() {
    this.comercioService.obtenerTodoComercioPendiente()
      .subscribe(data => this.comercios = data);
  }

  aprobar(comercio: Comercio) {
    comercio.estado = 1;
    this.comercioService.modificarEstadoComercio(comercio)
      .subscribe(
        (response) => {
          this.comercios = this.comercios.filter(c => c !== comercio);
        },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
  }

  rechazar(comercio: Comercio) {
    comercio.estado = -1;
    this.comercioService.modificarEstadoComercio(comercio)
      .subscribe(
        (response) => {
          this.comercios = this.comercios.filter(c => c !== comercio);
        },
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
  }

  abrirLink(url) {
    window.open(url, '_blank');
  }

}
