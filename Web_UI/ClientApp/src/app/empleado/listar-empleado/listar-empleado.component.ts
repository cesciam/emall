import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmpleadoList } from '../../models/empleado-list.model';
import { ActivatedRoute } from '@angular/router';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  private empleados: EmpleadoList[];
  private comercioId: number;
  private filtro = '';
  private error: object = null;
  id_empleado: number;
  private usuarioLogueado: string;
  public accion: string = "Eliminación usuario";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado);

  constructor(private bitacora: BitacoraService,
    private service: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;

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

  onDelete(id: number) {
    this.service.deleteEmpleado(id).subscribe(response => {
      this.service.fillList()
    });

    this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });

  }

  onUpdate(id: number) {
    this.router.navigate(['listar-empleado/', this.comercioId, 'modificar-empleado', id]);
  }

  empleadoToDelete(id:number){
    this.id_empleado=id;
  }
}
