import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { ComercioService } from '../services/comercio.service';
import { BitacoraService } from '../services/bitacora.service';

@Component({
  selector: 'app-aprobar-comercio',
  templateUrl: './aprobar-comercio.component.html',
  styleUrls: ['./aprobar-comercio.component.css']
})
export class AprobarComercioComponent implements OnInit {

  private usuarioLogueado: string;
  private comercios: Comercio[];
  private error: any;
  private filterComercio = '';
  public accionAprobar: string = "Aprobación comercio";
  public accionRechazar: string = "Rechazo comercio";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado);

  constructor(private comercioService: ComercioService, private bitacora: BitacoraService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
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
    this.bitacora.llenarBitacora(this.accionAprobar, this.id_usuario).subscribe(
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
    this.bitacora.llenarBitacora(this.accionRechazar, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
  }

  abrirLink(url) {
    window.open(url, '_blank');
  }

}
