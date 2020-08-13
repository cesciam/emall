import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { Impuesto } from '../models/impuesto.model';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  private carritoLocalStorage: Item[];
  private tipoCarrito: string;
  private total: number = 0;
  @Input() txtLogistica: string;
 
  constructor(private serviceItem: ItemService) {
    this.llenarCarrito();
    this.tipoCarrito = localStorage.getItem('tipoCarrito');
  }

  ngOnInit() {
  }

  async llenarCarrito() {
    this.carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

    let carrito: Item[] = this.carritoLocalStorage;

    for (let item of carrito) {
      let impuesto: Impuesto = await this.serviceItem.ObtenerImpuestoItem(item.id_impuesto);
      item.precio = item.precio + (item.precio / 100 * impuesto.Porcentaje);
      this.total = this.total + item.precio;
    }
  }

  eliminarItem(item: Item) {
    this.carritoLocalStorage = this.carritoLocalStorage.filter(i => i !== item);
    this.total = this.total - item.precio;
    localStorage.setItem('carrito', JSON.stringify(this.carritoLocalStorage));

    var items: Item[] = JSON.parse(localStorage.getItem('carrito'));
    if (items.length == 0) {
      localStorage.removeItem('tipoCarrito');
      localStorage.removeItem('carrito');
    }
  }

  pagar() {
    console.log(this.txtLogistica);
  }

}
