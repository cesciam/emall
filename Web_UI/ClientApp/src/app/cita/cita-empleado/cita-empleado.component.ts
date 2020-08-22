import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { CitaListCom } from 'src/app/models/CitaListCom';
import { CitaListEmp } from 'src/app/models/CitaListEmp';

@Component({
  selector: 'app-cita-empleado',
  templateUrl: './cita-empleado.component.html',
  styleUrls: ['./cita-empleado.component.css']
})
export class CitaEmpleadoComponent implements OnInit {

  private citas: any[];
  private misCitas: boolean =false;
  constructor(private service: CitaService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id= parseInt(this.route.snapshot.params['id']);
    this.service.obtenerCitasPorComercio(id)
    .subscribe(
      (data: CitaListCom[]) => {
        data = this.convertirHoras(data);
        this.citas = data;
      },
      (err: any) => console.log(err)
    );
  }

  citasEmpleado(): void {
    this.misCitas=true;
    let id =JSON.parse (localStorage.getItem('usuario-logueado')).usuario.Id;
    this.service.obtenerCitasPorEmpleado(id)
    .subscribe(
      (data: CitaListEmp[]) => {
        data = this.convertirHoras(data);
        this.citas = data;
      }
    );
  }

  convertirHoras(data: any[]): any[]{
    for(let i = 0; i < data.length; i++){
      var hour = new Date(data[i].hora_inicio).getHours();
      var deit = new Date(data[i].hora_inicio);
      var minute = (deit.getMinutes()<10?'0':'') + deit.getMinutes() ;
      data[i].hora_i = hour +":"+minute;

      hour = new Date(data[i].hora_fin).getHours();
      deit = new Date(data[i].hora_fin);
      minute = (deit.getMinutes()<10?'0':'') + deit.getMinutes() ;
      data[i].hora_f = hour +":"+minute;

      var dateObj = new Date(data[i].fecha);
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj.getUTCFullYear();
      var date=  day + "/" +month + "/" + year;
      data[i].fecha_s = date;
    }
    return data;
  }
}
