import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-listar-horario',
  templateUrl: './listar-horario.component.html',
  styleUrls: ['./listar-horario.component.css']
})
export class ListarHorarioComponent implements OnInit {
  public horarios : Horario[];
  private filtro = ''; 

  constructor(private service : HorarioService) { }

  ngOnInit() {
    this.fillList();
  }

  fillList(){
    this.service.obtenerTodoHorario().subscribe(data=>{
      this.horarios=data;
      this.formatFechasHoras();
    })
  }

  formatFechasHoras(){
    this.horarios.forEach(element => {
      let fechaSplit = element.fecha.split('T')
      element.fecha=fechaSplit[0]

      let horaInicioSplit = element.hora_inicio.split('T')
      element.hora_inicio = horaInicioSplit[1]

      let horaFinSplit = element.hora_fin.split('T')
      element.hora_fin = horaFinSplit[1]
    });
  }

  onUpdate(id:number){

  }

  horarioToDelete(id:number){

  }

}
