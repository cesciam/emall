import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/Sucursal';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  private empleadoForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;
  private isSendingData: boolean = false;
  private sucursales: Sucursal[];
  private roles: Rol[];
  private comercioId: number;

  constructor(
    private service: EmpleadoService,
    private serviceRol: RolService,
    private route: ActivatedRoute,
    private serviceSucursal: SucursalService) {
  }

  ngOnInit() {
    this.comercioId = +this.route.snapshot.paramMap.get('comercio');
    this.obtenerSucursales();
    this.obtenerRoles();

    this.empleadoForm = new FormGroup({
      Correo: new FormControl('', [Validators.required, Validators.email]),
      Rol: new FormControl('', [Validators.required]),
      Sucursal: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.empleadoForm.controls;
  }

  obtenerSucursales() {
    this.serviceSucursal.ObtenerTodoSucursales(this.comercioId)
      .subscribe(data => {
        this.sucursales = data;
      });
  }

  obtenerRoles() {
    this.serviceRol.obtenerRolesPorComercio(this.comercioId)
      .subscribe(data => {
        this.roles = data;
      });

  }

  registrarEmpleado() {
    console.log(this.empleadoForm.value);
  }

  onSubmit() {
    this.submitted = true;

    if (this.empleadoForm.invalid) {
      window.scroll(0, 0);
      return;
    }

      this.registrarEmpleado();
  }
}
