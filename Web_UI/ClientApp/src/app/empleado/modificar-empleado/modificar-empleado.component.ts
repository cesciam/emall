import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {

  empleado : Empleado
  constructor(private service: EmpleadoService) {
    
   }

  ngOnInit() {
    this.fillForm()
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
    form.resetForm();
  }

  updateRecord(form: NgForm) {
    this.service.putEmpleado(form.value).subscribe(res => {
      this.fillForm()
    })
  }

  fillForm(){
    this.empleado = JSON.parse(localStorage.getItem("empleado")); 
    this.service.formData = Object.assign({}, this.empleado);
  }


}
