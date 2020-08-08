import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-horario',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.css']
})
export class AgregarHorarioComponent implements OnInit {
  public formData : Horario;

  constructor(private service : HorarioService) { }

  ngOnInit() {
    this.resetForm()
  }

  onSubmit(formData : NgForm){
    this.service.crearHorario(formData.value).subscribe()
    console.log(formData.value)
  }

  resetForm(form?:NgForm){
    if(form!=null){
      form.reset();
    }
    this.formData={
      id:0,
      fecha:'',
      tipo_horario:'',
      hora_inicio:'',
      hora_fin:'',
      id_usuario:10
    }
  }
}
