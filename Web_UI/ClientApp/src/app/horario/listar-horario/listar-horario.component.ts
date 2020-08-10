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

  constructor(private service : HorarioService) { }

  ngOnInit() {
    this.fillList();
  }

  fillList(){
    this.service.obtenerTodoHorario().subscribe(data =>{
      this.horarios = data;
    })
  }

  onUpdate(id:number){

  }

  horarioToDelete(id:number){

  }

}
