import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  

  constructor(private service : EmpleadoService, private router: Router) { }

  ngOnInit(): void {
    this.service.fillList();
  }

  

  onDelete(id : number){
    if(confirm('Confirma que desea eliminar el registro')){
      this.service.deleteEmpleado(id).subscribe(res=>{
        this.service.fillList();
      })
    }
  }

  onUpdate(id : number){
    this.service.getById(id);
    let empleado = this.service.formData;
    localStorage.setItem("empleado", JSON.stringify(empleado) );
    this.router.navigate(['modificar-empleado']);
  }

}
