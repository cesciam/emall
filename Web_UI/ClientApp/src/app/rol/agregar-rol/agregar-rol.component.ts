import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {

  constructor(private service: RolService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.service.formData = {
      id: 0,
      nombre: '',
      descripcion: '',
      id_comercio:0
    }
  }

  onSubmit(form:NgForm){
    this.insertRecord(form);
    form.resetForm();
  }

  insertRecord(form:NgForm){
    this.service.postRol(form.value).subscribe(res=>{
      this.resetForm()
    });
  }

}
