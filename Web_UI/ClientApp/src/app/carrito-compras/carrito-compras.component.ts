import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { Impuesto } from '../models/impuesto.model';
import { CarritoComprasService } from '../services/carrito-compras.service';
import { Envio } from '../models/envio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaService } from '../services/cita.service';
import { Cita } from '../models/Cita';

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

  //  Variables para el registro de la cita
  servicioSeleccionado: Item;
  time = {hour: 0o0, minute: 0o0};

  dateObj = new Date();
  date = {
    year: this.dateObj.getUTCFullYear(),
    month: this.dateObj.getUTCMonth() + 1 ,
    day: this.dateObj.getDate()
  };
  datePicker: any;

  //

  constructor(private serviceItem: ItemService,
    private carritoComprasService: CarritoComprasService,
    private router: Router, private route: ActivatedRoute,
    private citaService: CitaService) {
    this.tipoCarrito = localStorage.getItem('tipoCarrito');
  }

  ngOnInit() {
    this.llenarCarrito();
    this.validarUsuarioLogueado();

    if (this.tipoCarrito == 'Servicio') {
      this.serviceItem.getItemById(this.carritoLocalStorage[0].id)
      .subscribe(
        (data: Item) => this.servicioSeleccionado = data
        
      );
    }
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
    envio.idCliente = parseInt(usuarioLogeado.usuario.Id);
    envio.items = this.carritoLocalStorage;

    this.carritoComprasService.registrarEnvio(envio)
      .subscribe(
        (response) => {
          localStorage.removeItem('carrito');
          localStorage.removeItem('tipoCarrito');
          this.carritoLocalStorage = null;
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = 'Algo salió mal al registar su envío. Inténtelo más tarde.';
          window.scroll(0, 0);
        });
  }
  agendarCita() {
    let list = this.calcularMinutos(this.servicioSeleccionado.duracion);

    let horas = this.time.hour + list[0];
    let minutos =  this.time.minute + list[1];

    while (minutos > 60) {
      let newList = this.calcularMinutos(minutos);
      horas += newList[0];
      minutos += newList[1];
    }

    let minString: string;
    let minStringTimePicker;
    if (minutos < 10) {
      minString = '0' + minutos;
    } else {
      minString = minutos.toString();
    }

    if (this.time.minute < 10) {
      minStringTimePicker = '0' + this.time.minute;
    } else {
      minStringTimePicker = this.time.minute.toString();
    }

    var fechaCita = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day);
    var horaInicio = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day +' '+this.time.hour+':'+minStringTimePicker+':00');
    var horaFin = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day +' '+horas+':'+minString+':00');
  
    let cita: Cita = {
      id_item: this.servicioSeleccionado.id,
      id_cliente: this.usuarioLogueado.usuario.Id,
      fecha: fechaCita,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      id: -1,
      id_empleado: -1,
      id_sucursal: this.servicioSeleccionado.id_sucursal
   };

    this.citaService.registrarCitaServicio(cita)
    .subscribe((data: any) => {
      localStorage.removeItem('carrito');
      localStorage.removeItem('tipoCarrito');
      this.router.navigate(['perfil-usuario']);
    },
    (error) => {
      this.error = error.error;
      window.scroll(0, 0);
    });

  }

  calcularMinutos(min: number): number[] {
    let num = min;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let horasMinutos: number[] =  [rhours, rminutes];

    return horasMinutos;
  }

}
