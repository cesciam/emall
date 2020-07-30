import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NgForm } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  private sucursales : Sucursal[];

  constructor(private service: EmpleadoService,
     private serviceRol: RolService, private serviceSucursal : SucursalService) { }

  async ngOnInit(): Promise<void> {
    this.resetForm();
    this.serviceSucursal.ObtenerTodoSucursales(7)
      .subscribe(data => {
        this.sucursales = data;
      });
    //this.sucursales = await this.serviceSucursal.ObtenerTodoSucursales(7);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.service.formData = {
      id: 0,
      id_usuario: 0,
      id_rol: 0,
      id_sucursal: 0
    }
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
    form.resetForm();
  }

  insertRecord(form: NgForm) {
    this.service.postEmpleado(form.value).subscribe(res => {
      this.resetForm(form)
    })
  }

  
}
