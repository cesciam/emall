import { Component, OnInit } from '@angular/core';
import { EnvioList } from 'src/app/models/envio-list.model';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-envio-detalle',
  templateUrl: './envio-detalle.component.html',
  styleUrls: ['./envio-detalle.component.css']
})
export class EnvioDetalleComponent implements OnInit {

  private envio: EnvioList
  private sucursal: number
  private items: Item[]
  constructor() { }

  ngOnInit() {
    this.obtenerDatosEnvio()
    this.sucursal = 1
  }

  obtenerDatosEnvio() {
    this.envio = {
      id: 1,
      id_cliente: 2,
      nombre_cliente: 'cliente 1',
      latitud: '0,0,0',
      longitud: '0,0,0',
      estado: 0,
      id_empleado: 12,
      nombre_empleado: 'empleado 1',
      codigo: '123Dwe'
    }
    this.obtenerItems()
  }

  obtenerItems() {
    this.items = [
      {
        id: 1,
        inventario: 0,
        nombre: 'Cheeseburger',
        descripcion: 'placeholder',
        precio: 200,
        id_sucursal: 1,
        duracion: 23,
        tipo: 'producto',
        id_impuesto: 0,
        id_foto: 'placeholder'
      },
      {
        id: 2,
        inventario: 0,
        nombre: 'CocaCola',
        descripcion: 'placeholder',
        precio: 200,
        id_sucursal: 1,
        duracion: 23,
        tipo: 'producto',
        id_impuesto: 0,
        id_foto: 'placeholder'
      },{
        id: 3,
        inventario: 0,
        nombre: 'Papas',
        descripcion: 'placeholder',
        precio: 200,
        id_sucursal: 1,
        duracion: 23,
        tipo: 'producto',
        id_impuesto: 0,
        id_foto: 'placeholder'
      },
    ]
  }

}
