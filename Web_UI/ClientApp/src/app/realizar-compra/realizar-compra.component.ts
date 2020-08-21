import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { EnvioService } from '../services/envio.service';
import { Envio } from '../models/envio.model';
import { Transaccion } from '../models/transaccion.model';
import { ItemService } from '../services/item.service';
import { Impuesto } from '../models/impuesto.model';
import { RealizarCompraService } from '../services/realizar-compra.service';
import { MultaService } from '../services/multa.service';
import { Multa } from '../models/multa';
import { Configuracion } from '../models/configuracion';

declare var paypal;

@Component({
  selector: 'app-realizar-compra',
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css']
})
export class RealizarCompraComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  private idEnvio: number;
  private items: Item[];
  private envio: Envio;
  private total: number = 0;
  private precioDolar: number = 595.10;
  private error: any;
  private id_usuario: number;
  private id_usuario_log: number;
  private multa: boolean = false;
  private multas: Multa[];
  private valor_multa: number;


  constructor(private route: ActivatedRoute, private envioService: EnvioService, private serviceItem: ItemService, private compraService: RealizarCompraService, private router: Router, private serviceMulta: MultaService) { }


  async validarMulta() {
    this.id_usuario = parseInt(this.route.snapshot.queryParams['usuario']);
    this.id_usuario_log = JSON.parse(localStorage.getItem('usuario-logueado'));

    if (this.id_usuario != null && this.id_usuario_log != null) {
      this.multas = new Array<Multa>();
      this.multas = await this.serviceMulta.ObtenerMultasUsuario(this.id_usuario);
      this.multa = true;
      console.log(this.id_usuario)
      console.log(this.multas)
    }
  }

  async pagarMulta() {
    this.envio = new Envio;
    this.envio.id = 0;
    this.envio.estado = 2;
    this.envio.idEmpleado = this.multas[0].id_item;
    this.envio.idCliente = this.id_usuario;
    this.envio.codigo = "pago_multa";

    console.log(this.envio)


    let valor_multa: Configuracion;
    valor_multa = new Configuracion();
    valor_multa = await this.serviceMulta.obtenerConfig("valor_multa");
    this.valor_multa = valor_multa.valor;
    this.total = (this.valor_multa * this.multas.length)

  }


  async ngOnInit() {
    

    await this.validarMulta();

    if (this.multa) {
      this.pagarMulta();
    } else {
      this.obtenerItemsEnvio();
    }

    
    this.paypalInit();
  }

   obtenerItemsEnvio() {
    this.idEnvio = parseInt(this.route.snapshot.queryParams['pago']);

     this.envioService.obtenerEnvio(this.idEnvio)
       .subscribe(async data => {
        this.envio = data

        for (let item of this.envio.items) {
          let impuesto: Impuesto = await this.serviceItem.ObtenerImpuestoItem(item.id_impuesto);
          item.precio = item.precio + (item.precio / 100 * impuesto.Porcentaje);
          this.total = this.total + item.precio;
        }

      });
   }

  paypalInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Items de tienda',
                amount: {
                  currency_code: 'USD',
                  value: this.currencyConvertor()
                }
              },

            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          let transaccion: Transaccion = new Transaccion();
          transaccion.tipoPago = 'Paypal';
          transaccion.monto = this.total;

          this.compraService.realizarPago(this.envio, transaccion).subscribe(
            (response) => {
              this.router.navigate(['/']);
            },
            (error) => {
              this.error = error.error;
              window.scroll(0, 0);
            });
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  currencyConvertor(): string {
    return (this.total / this.precioDolar).toFixed(2).toString();
  }


}
