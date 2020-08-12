import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public martesDisabled: boolean;
  public miercolesDisabled: boolean;
  public juevesDisabled: boolean;
  public viernesDisabled: boolean;
  public sabadoDisabled: boolean;
  public domingoDisabled: boolean;

  private sucursales: Sucursal[];
  private id_comercio: number;
  private sucursal: number;
  private horariosDeSucursal: Horario[]

  public formLunes : NgForm;


  constructor(private service: HorarioService,
    private serviceSucursal: SucursalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id_comercio = parseInt(this.activatedRoute.snapshot.paramMap.get('id_comercio'));
    this.inicializarHorarios()
    this.obtenerSucursales()
  }

  cambiarSucursal() {
    this.formLunes.reset()
    this.lunesChecked= false;
    console.log(this.sucursal)
    this.service.obtenerHorarioPorSucursal(this.sucursal).subscribe(data => {
      this.horariosDeSucursal = data;
      console.log(this.horariosDeSucursal)
      this.llenarHorarios();
    })
  }

  llenarHorarios() {
    this.horariosDeSucursal.forEach(element => {
      switch (element.tipo_horario) {
        case "Lunes":
          console.log("abre lunes")
          this.lunesChecked=true;
          break;
        case "Martes":
          break;
        case "Miercoles":
          break;
        case "Jueves":
          break;
        case "Viernes":
          break;
        case "Sabado":
          break;
        case "Domingo":
          break;
      }
    });
  }

  inicializarHorarios() {
    this.lunesFormData = new Horario();
    this.martesFormData = new Horario();
    this.miercolesFormData = new Horario();
    this.juevesFormData = new Horario();
    this.viernesFormData = new Horario();
    this.sabadoFormData = new Horario();
    this.domingoFormData = new Horario();
    this.sucursal = 0;
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
    if (!this.lunesChecked) {
      let horarioLunes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Lunes",
        hora_inicio: this.lunesFormData.hora_inicio,
        hora_fin: this.lunesFormData.hora_fin,
        id_usuario: -1,
        id_sucursal: Number(this.sucursal)
      }
      this.service.crearHorario(horarioLunes).subscribe()
      console.log(horarioLunes)
    }
  }
  horarioMartes() {
    if (!this.martesDisabled) {
      let horarioMartes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Martes",
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
    if (!this.miercolesDisabled) {
      let horarioMiercoles: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Lunes",
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
    if (!this.juevesDisabled) {
      let horarioJueves: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Lunes",
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
    if (!this.viernesDisabled) {
      let horarioViernes: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Viernes",
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
    if (!this.sabadoDisabled) {
      let horarioSabado: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Sabado",
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
    if (!this.domingoDisabled) {
      let horarioDomingo: Horario = {
        id: 0,
        fecha: "1900-12-12",
        tipo_horario: "Domingo",
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
    $event.target.checked === true ? this.martesDisabled = false : this.martesDisabled = true;
  }
  estadoMiercoles($event) {
    $event.target.checked === true ? this.miercolesDisabled = false : this.miercolesDisabled = true;
  }
  estadoJueves($event) {
    $event.target.checked === true ? this.juevesDisabled = false : this.juevesDisabled = true;
  }
  estadoViernes($event) {
    $event.target.checked === true ? this.viernesDisabled = false : this.viernesDisabled = true;
  }
  estadoSabado($event) {
    $event.target.checked === true ? this.sabadoDisabled = false : this.sabadoDisabled = true;
  }
  estadoDomingo($event) {
    $event.target.checked === true ? this.domingoDisabled = false : this.domingoDisabled = true;
  }

}
