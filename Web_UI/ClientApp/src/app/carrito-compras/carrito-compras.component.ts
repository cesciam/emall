import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { Impuesto } from '../models/impuesto.model';
import { CarritoComprasService } from '../services/carrito-compras.service';
import { Envio } from '../models/envio.model';

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
  usuarioLogueado: object = null;
  error: any;

  constructor(private serviceItem: ItemService, private carritoComprasService: CarritoComprasService) {
    this.tipoCarrito = localStorage.getItem('tipoCarrito');
  }

  ngOnInit() {
    this.llenarCarrito();
    this.validarUsuarioLogueado();
  }


  validarUsuarioLogueado() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));

    if (this.usuarioLogueado == null) {
      this.error = 'Debe iniciar sesión para agregar items a tu carrito de compras.';
    }
  }

  async llenarCarrito() {
    this.carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

    if (this.carritoLocalStorage != null) {
      let carrito: Item[] = this.carritoLocalStorage;

      for (let item of carrito) {
        let impuesto: Impuesto = await this.serviceItem.ObtenerImpuestoItem(item.id_impuesto);
        item.precio = item.precio + (item.precio / 100 * impuesto.Porcentaje);
        this.total = this.total + item.precio;
      }
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
    if (this.txtLogistica == 'Recibirlo por envío') {
      this.enviarItems();
    } else {

    }
  }

  enviarItems() {
    let envio: Envio = new Envio();
    let usuarioLogeado = JSON.parse(localStorage.getItem('usuario-logueado'));

    envio.estado = 0;
    envio.idCliente = parseInt(this.usuarioLogueado.usuario.Id);
    envio.items = this.carritoLocalStorage;

    this.carritoComprasService.registrarEnvio(envio)
      .subscribe(
        (response) => {
          
        },
        (error) => {
          this.error = 'Algo salió mal al registar su envío. Inténtelo más tarde.';
          window.scroll(0, 0);
        });
  }

}
