import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmpleadoList } from '../../models/empleado-list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  private empleados: EmpleadoList[];
  private comercioId: number;
  
  constructor(
    private service: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.comercioId = this.activatedRoute.snapshot.queryParams['comercio'];
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.service.obtenerEmpleados(this.comercioId)
      .subscribe(data => this.empleados = data);
  }

  agregarEmpleado() {
    this.router.navigate(['agregar-empleado', this.comercioId]);
  }

  onDelete(id : number) {
    if (confirm('Confirma que desea eliminar el registro')) {
      this.service.deleteEmpleado(id)
        .subscribe(response => {
          this.obtenerEmpleados();
        })
    }
  }

  onUpdate(id : number) {
    this.service.getById(id);
    let empleado = this.service.formData;
    localStorage.setItem("empleado", JSON.stringify(empleado) );
    this.router.navigate(['modificar-empleado']);
  }

}
