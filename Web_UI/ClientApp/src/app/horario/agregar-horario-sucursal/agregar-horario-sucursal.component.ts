import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../models/horario.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';
import { ActivatedRoute } from '@angular/router';
import { throttleTime } from 'rxjs/operators';

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

  public lunesModificado: boolean;
  public martesModificado: boolean;
  public miercolesModificado: boolean;
  public juevesModificado: boolean;
  public viernesModificado: boolean;
  public sabadoModificado: boolean;
  public domingoModificado: boolean;

  private sucursales: Sucursal[];
  private id_comercio: number;
  private sucursal: number;
  private horariosDeSucursal: Horario[]

  public alertaError: boolean = false;
  public mensajeError : string =
  "Por favor ingrese una hora válida e intente guardar de nuevo"


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
    this.limpiarCheckboxes();
    this.inicializarHorarios();
    if (this.sucursal != 0) {
     this.service.obtenerHorarioPorSucursal(this.sucursal).subscribe(data => {
        this.horariosDeSucursal = data;
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
          this.lunesFormData = element;
          this.lunesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.lunesFormData.hora_inicio = horaInicioSplit[1].substr(0, 5);
          horaFinSplit = element.hora_fin.split('T')
          this.lunesFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Tuesday":
          this.martesFormData = element;
          this.martesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.martesFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.martesFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Wednesday":
          this.miercolesFormData = element;
          this.miercolesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.miercolesFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.miercolesFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Thursday":
          this.juevesFormData = element;
          this.juevesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.juevesFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.juevesFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Friday":
          this.viernesFormData = element;
          this.viernesChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.viernesFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.viernesFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Saturday":
          this.sabadoFormData = element;
          this.sabadoChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.sabadoFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.sabadoFormData.hora_fin = horaFinSplit[1].substr(0, 5)
          break;
        case "Sunday":
          this.domingoFormData = element;
          this.domingoChecked = true;
          horaInicioSplit = element.hora_inicio.split('T')
          this.domingoFormData.hora_inicio = horaInicioSplit[1].substr(0, 5)
          horaFinSplit = element.hora_fin.split('T')
          this.domingoFormData.hora_fin = horaFinSplit[1].substr(0, 5)
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

  

  async onSubmit() {
    this.alertaError = false
    this.horarioLunes();
    this.horarioMartes();
    this.horarioMiercoles();
    this.horarioJueves();
    this.horarioViernes();
    this.horarioSabado();
    this.horarioDomingo();
    await new Promise(resolve => setTimeout(() => resolve(), 2000))
    .then(() => this.cambiarSucursal());
    
  }

  horarioLunes() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Monday")) {
        registrado = true;
      }
    });
    if (this.lunesChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.lunesFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.lunesFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioLunes: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Monday",
            hora_inicio: this.lunesFormData.hora_inicio,
            hora_fin: this.lunesFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioLunes).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioLunes: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Monday",
          hora_inicio: this.lunesFormData.hora_inicio,
          hora_fin: this.lunesFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioLunes).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Monday")) {
          this.service.borrarHorario(this.lunesFormData.id).subscribe()
        }
      });
    }

  }
  horarioMartes() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Tuesday")) {
        registrado = true;
      }
    });

    if (this.martesChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.martesFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.martesFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioMartes: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Tuesday",
            hora_inicio: this.martesFormData.hora_inicio,
            hora_fin: this.martesFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioMartes).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioMartes: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Tuesday",
          hora_inicio: this.martesFormData.hora_inicio,
          hora_fin: this.martesFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioMartes).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Tuesday")) {
          this.service.borrarHorario(this.martesFormData.id).subscribe()
        }
      });

    }

  }
  horarioMiercoles() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Wednesday")) {
        registrado = true;
      }
    });

    if (this.miercolesChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.miercolesFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.miercolesFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioMiercoles: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Wednesday",
            hora_inicio: this.miercolesFormData.hora_inicio,
            hora_fin: this.miercolesFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioMiercoles).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioMiercoles: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Wednesday",
          hora_inicio: this.miercolesFormData.hora_inicio,
          hora_fin: this.miercolesFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioMiercoles).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Wednesday")) {
          this.service.borrarHorario(this.miercolesFormData.id).subscribe()
        }
      });
    }


  }
  horarioJueves() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Thursday")) {
        registrado = true;
      }
    });

    if (this.juevesChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.juevesFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.juevesFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioJueves: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Thursday",
            hora_inicio: this.juevesFormData.hora_inicio,
            hora_fin: this.juevesFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioJueves).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioJueves: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Thursday",
          hora_inicio: this.juevesFormData.hora_inicio,
          hora_fin: this.juevesFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioJueves).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Thursday")) {
          this.service.borrarHorario(this.juevesFormData.id).subscribe()
        }
      });
    }

  }
  horarioViernes() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Friday")) {
        registrado = true;
      }
    });

    if (this.viernesChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.viernesFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.viernesFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioViernes: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Friday",
            hora_inicio: this.viernesFormData.hora_inicio,
            hora_fin: this.viernesFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioViernes).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioViernes: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Friday",
          hora_inicio: this.viernesFormData.hora_inicio,
          hora_fin: this.viernesFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioViernes).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Friday")) {
          this.service.borrarHorario(this.viernesFormData.id).subscribe()
        }
      });
    }


  }
  horarioSabado() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Saturday")) {
        registrado = true;
      }
    });

    if (this.sabadoChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.sabadoFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.sabadoFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioSabado: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Saturday",
            hora_inicio: this.sabadoFormData.hora_inicio,
            hora_fin: this.sabadoFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioSabado).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioSabado: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Saturday",
          hora_inicio: this.sabadoFormData.hora_inicio,
          hora_fin: this.sabadoFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioSabado).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Saturday")) {
          this.service.borrarHorario(this.sabadoFormData.id).subscribe()
        }
      });
    }


  }
  horarioDomingo() {
    let registrado: boolean
    this.horariosDeSucursal.forEach(element => {
      if (element.tipo_horario.match("Sunday")) {
        registrado = true;
      }
    });

    if (this.domingoChecked) {
      if (this.horariosDeSucursal.length > 0) {
        if (registrado) {
          this.domingoFormData.fecha = "1900-12-12"
          this.service.modificarHorario(this.domingoFormData).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        } else {
          let horarioDomingo: Horario = {
            id: 0,
            fecha: "1900-12-12",
            tipo_horario: "Sunday",
            hora_inicio: this.domingoFormData.hora_inicio,
            hora_fin: this.domingoFormData.hora_fin,
            id_usuario: -1,
            id_sucursal: Number(this.sucursal)
          }
          this.service.crearHorario(horarioDomingo).subscribe((response) => {},
          (error) => {
            console.log(error)
            this.alertaError = true;
          });
        }
      } else {
        let horarioDomingo: Horario = {
          id: 0,
          fecha: "1900-12-12",
          tipo_horario: "Sunday",
          hora_inicio: this.domingoFormData.hora_inicio,
          hora_fin: this.domingoFormData.hora_fin,
          id_usuario: -1,
          id_sucursal: Number(this.sucursal)
        }
        this.service.crearHorario(horarioDomingo).subscribe((response) => {},
        (error) => {
          console.log(error)
          this.alertaError = true;
        });
      }
    } else {
      this.horariosDeSucursal.forEach(element => {
        if (element.tipo_horario.match("Sunday")) {
          this.service.borrarHorario(this.domingoFormData.id).subscribe()
        }
      });
    }


  }


}
