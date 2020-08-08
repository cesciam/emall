import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from '../../models/configuracion';

@Component({
  selector: 'app-listar-configuracion',
  templateUrl: './listar-configuracion.component.html',
  styleUrls: ['./listar-configuracion.component.css']
})
export class ListarConfiguracionComponent implements OnInit {

  contrasennasAnt: Configuracion;
  pressed: boolean;
  value: number;
  configuraciones: Configuracion[];
  tmp_config = new Configuracion();
  selectedConfig: number;
  error: any;


  constructor(private service: ConfiguracionService) {
    

    this.tmp_config = new Configuracion();
    this.selectedConfig = 0;
  }

  ngOnInit() {

    this.llenarConfig();
  //this.service.obtenerConfigContraseñaAntigua()
  //.subscribe(
  //  (data: Configuracion) => this.contrasennasAnt = data,
  //  (err: any) => console.log
  //);

    //this.pressed = false;
    //this.selectedConfig = 0;

  }



  llenarConfig() {
    this.service.ObtenerTodoConfiguracion()
      .subscribe(
        (data: Configuracion[]) => this.configuraciones = data,
        (err: any) => console.log
      );
  }

  editar(id: number) {
    this.selectedConfig = id;
      //this.pressed = true;
      //console.log(this.contrasennasAnt);
  }







  save(): void {
    this.tmp_config.id = this.selectedConfig;
    console.log(this.tmp_config);
    this.service.actualizarConfiguracion(this.tmp_config)
    .subscribe(
      (data: any) => console.log(data),
      (err: any) => console.log(err),
    );
    this.selectedConfig = 0;
    this.llenarConfig();
  }

  actualizar(): void {
    this.tmp_config.id = this.selectedConfig;

    this.service.actualizarConfiguracion(this.tmp_config)
      .subscribe
      (
        (reponse) => this.llenarConfig(),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });
    this.selectedConfig = 0;
   
  }



}
