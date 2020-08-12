import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../models/horario.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-horario-sucursal',
  templateUrl: './agregar-horario-sucursal.component.html',
  styleUrls: ['./agregar-horario-sucursal.component.css']
})
export class AgregarHorarioSucursalComponent implements OnInit {
  public lunesFormData: Horario;
  public martesFormData: Horario;
  public miercolesFormData: Horario;
  public juevesFormData: Horario;
  public viernesFormData: Horario;
  public sabadoFormData: Horario;
  public domingoFormData: Horario;

  public lunesChecked: boolean;
  public martesChecked: boolean;
  public miercolesChecked: boolean;
  public juevesChecked: boolean;
  public viernesChecked: boolean;
  public sabadoChecked: boolean;
  public domingoChecked: boolean;

  private sucursales: Sucursal[];
  private id_comercio: number;
  private sucursal: number;
  private horariosDeSucursal: Horario[]


  constructor(private service: HorarioService,
    private serviceSucursal: SucursalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id_comercio = parseInt(this.activatedRoute.snapshot.paramMap.get('id_comercio'));
    this.inicializarHorarios()
    this.sucursal = 0;
    this.obtenerSucursales()
  }

  cambiarSucursal() {
    this.limpiarCheckboxes()
    this.inicializarHorarios()
    if (this.sucursal != 0) {
      this.service.obtenerHorarioPorSucursal(this.sucursal).subscribe(data => {
        this.horariosDeSucursal = data;
        console.log(this.horariosDeSucursal)
        this.llenarHorarios();
      })
    }
  }

  inicializarHorarios() {
    this.lunesFormData = new Horario();
    this.martesFormData = new Horario();
    this.miercolesFormData = new Horario();
    this.juevesFormData = new Horario();
    this.viernesFormData = new Horario();
    this.sabadoFormData = new Horario();
    this.domingoFormData = new Horario();
  }

  llenarHorarios() {

    this.horariosDeSucursal.forEach(element => {
      let horaInicioSplit: string[];
      let horaFinSplit: string[];
      switch (element.tipo_horario) {
        case "Monday":
          this.lunesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.lunesFormData.hora_inicio = horaInicioSplit[1];
          horaFinSplit = element.hora_fin.split('T')
          this.lunesFormData.hora_fin = horaFinSplit[1]
          break;
        case "Tuesday":
          this.martesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.martesFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.martesFormData.hora_fin = horaFinSplit[1]
          break;
        case "Wednesday":
          this.miercolesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.miercolesFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.miercolesFormData.hora_fin = horaFinSplit[1]
          break;
        case "Thursday":
          this.juevesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.juevesFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.juevesFormData.hora_fin = horaFinSplit[1]
          break;
        case "Friday":
          this.viernesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.viernesFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.viernesFormData.hora_fin = horaFinSplit[1]
          break;
        case "Saturday":
          this.sabadoChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.sabadoFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.sabadoFormData.hora_fin = horaFinSplit[1]
          break;
        case "Sunday":
          this.domingoChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.domingoFormData.hora_inicio = horaInicioSplit[1]
          horaFinSplit = element.hora_fin.split('T')
          this.domingoFormData.hora_fin = horaFinSplit[1]
          break;
      }
    });
  }

  limpiarCheckboxes() {
    this.lunesChecked = false;
    this.martesChecked = false;
    this.miercolesChecked = false;
    this.juevesChecked = false;
    this.viernesChecked = false;
    this.sabadoChecked = false;
    this.domingoChecked = false;
  }

  obtenerSucursales() {
    this.serviceSucursal.ObtenerTodoSucursales(this.id_comercio)
      .subscribe(data => {
        this.sucursales = data;
      });
  }

  onSubmit() {
    this.horarioLunes();
    this.horarioMartes();
    this.horarioMiercoles();
    this.horarioJueves();
    this.horarioJueves();
    this.horarioSabado();
    this.horarioDomingo();
  }

  horarioLunes() {
    if (this.lunesChecked) {
      let horarioLunes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Monday",
        hora_inicio: this.lunesFormData.hora_inicio,
        hora_fin: this.lunesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioLunes).subscribe(res=>{
        console.log("se registro")
      })
      console.log(horarioLunes)
    }
  }
  horarioMartes() {
    if (this.martesChecked) {
      let horarioMartes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Tuesday",
        hora_inicio: this.martesFormData.hora_inicio,
        hora_fin: this.martesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioMartes).subscribe()
      console.log(horarioMartes)
    }
  }
  horarioMiercoles() {
    if (this.miercolesChecked) {
      let horarioMiercoles: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Wednesday",
        hora_inicio: this.miercolesFormData.hora_inicio,
        hora_fin: this.miercolesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioMiercoles).subscribe()
      console.log(horarioMiercoles)
    }
  }
  horarioJueves() {
    if (this.juevesChecked) {
      let horarioJueves: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Thursday",
        hora_inicio: this.juevesFormData.hora_inicio,
        hora_fin: this.juevesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioJueves).subscribe()
      console.log(horarioJueves)
    }
  }
  horarioViernes() {
    if (this.viernesChecked) {
      let horarioViernes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Friday",
        hora_inicio: this.viernesFormData.hora_inicio,
        hora_fin: this.viernesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioViernes).subscribe()
      console.log(horarioViernes)
    }
  }
  horarioSabado() {
    if (this.sabadoChecked) {
      let horarioSabado: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Saturday",
        hora_inicio: this.sabadoFormData.hora_inicio,
        hora_fin: this.sabadoFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioSabado).subscribe()
      console.log(horarioSabado)
    }
  }
  horarioDomingo() {
    if (this.domingoChecked) {
      let horarioDomingo: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Sunday",
        hora_inicio: this.domingoFormData.hora_inicio,
        hora_fin: this.domingoFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioDomingo).subscribe()
      console.log(horarioDomingo)
    }
  }

  estadoLunes($event) {
    $event.target.checked === true ? this.lunesChecked = true : this.lunesChecked = false;
  }
  estadoMartes($event) {
    $event.target.checked === true ? this.martesChecked = true : this.martesChecked = false;
  }
  estadoMiercoles($event) {
    $event.target.checked === true ? this.miercolesChecked = true : this.miercolesChecked = false;
  }
  estadoJueves($event) {
    $event.target.checked === true ? this.juevesChecked = true : this.juevesChecked = false;
  }
  estadoViernes($event) {
    $event.target.checked === true ? this.viernesChecked = true : this.viernesChecked = false;
  }
  estadoSabado($event) {
    $event.target.checked === true ? this.sabadoChecked = true : this.sabadoChecked = false;
  }
  estadoDomingo($event) {
    $event.target.checked === true ? this.domingoChecked = true : this.domingoChecked = false;
  }

}
