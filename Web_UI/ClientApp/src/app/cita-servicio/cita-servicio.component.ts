import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Cita } from '../models/Cita';
import { Usuario } from '../models/usuario.model';
import { CitaService } from '../services/cita.service';


@Component({
  selector: 'app-cita-servicio',
  templateUrl: './cita-servicio.component.html',
  styleUrls: ['./cita-servicio.component.css']
})
export class CitaServicioComponent implements OnInit {
  servicioSeleccionado: Item;
  time = {hour: 0o0, minute: 0o0};
  private usuarioLogueado: any = null;


  dateObj = new Date();
  date = {
    year: this.dateObj.getUTCFullYear(),
    month: this.dateObj.getUTCMonth() + 1 ,
    day: this.dateObj.getDate()
  };
  datePicker: any;
  constructor(private service: ItemService, private route: ActivatedRoute, private citaService: CitaService) { }
  ngOnInit() {
    let itemID: number = parseInt(this.route.snapshot.params['id']);
    this.service.getItemById(itemID)
    .subscribe(
      (data: Item) => this.servicioSeleccionado = data
    );

    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado')).usuario;
  }

  onSubmit() {
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
    if(minutos < 10) {
      minString = '0' + minutos;
    }
    else{
      minString = minutos.toString();
    }

    if(this.time.minute < 10) {
      minStringTimePicker = '0' + this.time.minute;
    }
    else{
      minStringTimePicker = this.time.minute.toString();
    }

    var fechaCita = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day);
    var horaInicio = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day +' '+this.time.hour+':'+minStringTimePicker+':00');
    var horaFin = new Date(this.datePicker.year+'-'+this.datePicker.month+'-'+this.datePicker.day +' '+horas+':'+minString+':00');
  
    let cita: Cita = {
      id_item: this.servicioSeleccionado.id,
      id_cliente: this.usuarioLogueado.Id,
      fecha: fechaCita,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      id: -1,
      id_empleado: -1,
      id_sucursal: this.servicioSeleccionado.id_sucursal
   };
   
   

    this.citaService.registrarCitaServicio(cita)
    .subscribe((data: any)=>{
     console.log('Registrado con exitos');
    },
    (err: any) => console.log(err)
    );

  }

  calcularMinutos(min: number): number[] {
    var num = min;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    let horasMinutos: number[] =  [rhours, rminutes];

    return horasMinutos;
  }

}
