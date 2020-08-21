import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { CitaListCom } from 'src/app/models/CitaListCom';

@Component({
  selector: 'app-cita-sucursal',
  templateUrl: './cita-sucursal.component.html',
  styleUrls: ['./cita-sucursal.component.css']
})
export class CitaSucursalComponent implements OnInit {

  private citas: any[];
  private misCitas: boolean = false;
  constructor(private service: CitaService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id= parseInt(this.route.snapshot.params['id']);
    this.service.obtenerCitasPorSucursal(id)
    .subscribe(
      (data: CitaListCom[]) => {
        data = this.convertirHoras(data);
        this.citas = data;
      },
      (err: any) => console.log(err)
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
