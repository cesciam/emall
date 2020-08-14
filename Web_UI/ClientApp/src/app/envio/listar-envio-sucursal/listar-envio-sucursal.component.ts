import { Component, OnInit } from '@angular/core';
import { Envio } from 'src/app/models/envio.model';

@Component({
  selector: 'app-listar-envio-sucursal',
  templateUrl: './listar-envio-sucursal.component.html',
  styleUrls: ['./listar-envio-sucursal.component.css']
})
export class ListarEnvioSucursalComponent implements OnInit {

  public envios: Envio[]
  public estado: string;

  constructor() { }

  ngOnInit() {
    this.obtenerEnvios()
  }

  estadoToString(estado: number): string {
    switch (estado) {
      case 0:
        return "pendiente";
      case 1:
        return "en camino";
      case 2:
        return "entregado"
    }
  }

  obtenerEnvios() {
    this.envios = [
      {
        id: 1,
        id_cliente: 2,
        nombre_cliente: 'cliente 1',
        provincia: 'san jose',
        canton: 'mata redonda',
        distrito: 'estadio',
        latitud: '0,0,0',
        longitud: '0,0,0',
        estado: 0,
        id_empleado: 12,
        nombre_empleado: 'empleado 1',
        codigo: '123Dwe'
      },
      {
        id: 2,
        id_cliente: 2,
        nombre_cliente: 'cliente 2',
        provincia: 'san jose',
        canton: 'mata redonda',
        distrito: 'estadio',
        latitud: '0,0,0',
        longitud: '0,0,0',
        estado: 1,
        id_empleado: 12,
        nombre_empleado: 'empleado 2',
        codigo: '934D!23'
      }
    ]
  }

}
