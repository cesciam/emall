import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-listar-configuracion',
  templateUrl: './listar-configuracion.component.html',
  styleUrls: ['./listar-configuracion.component.css']
})
export class ListarConfiguracionComponent implements OnInit {

  contrasennasAnt: Configuracion;
  pressed: boolean;
  value: number;
  constructor(private service: ConfiguracionService) { }

  ngOnInit() {
  this.service.obtenerConfigContraseñaAntigua()
  .subscribe(
    (data: Configuracion) => this.contrasennasAnt = data,
    (err: any) => console.log
  );
  }

  editar() {
      this.pressed = true;
      console.log(this.contrasennasAnt);
  }

  save() {
    this.service.actualizarConfiguracion(this.contrasennasAnt)
    .subscribe(
      (data: any) => console.log(data),
      (err: any) => console.log(err)
    );
    this.pressed = false;
  }

}
