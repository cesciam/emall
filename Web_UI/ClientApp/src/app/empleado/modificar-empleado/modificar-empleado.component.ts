import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';
import { Rol } from 'src/app/models/rol.model';
import { EmpleadoList } from 'src/app/models/empleado-list.model';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {
  private comercioId: number;
  private empleado: EmpleadoList;
  private empleadoId: number;
  public sucursales: Sucursal[];
  private roles: Rol[];
  private sucursalSeleccionada : Sucursal;
  private rolSeleccionado: Rol;

  public sucursalForm : FormGroup;
  public rolForm: FormGroup;
  private usuarioLogueado: string;
  public accion: string = "Edición usuario";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado);

  constructor(private service: EmpleadoService,
    private serviceRol: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceSucursal: SucursalService,
    private fb: FormBuilder,
    private bitacora: BitacoraService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
  }

  ngOnInit() {
    this.comercioId = +this.route.snapshot.paramMap.get('id_comercio');
    this.empleadoId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.sucursalForm = new FormGroup({
      sucursalControl: new FormControl(),
    });
    this.rolForm = new FormGroup({
      rolControl: new FormControl()
    });
    this.getEmpleado();

  }


  //todo:estilos y modal

  updateRecord() {
    this.rolSeleccionado = this.rolForm.controls['rolControl'].value;
    this.sucursalSeleccionada = this.sucursalForm.controls['sucursalControl'].value;
    
    this.service.putEmpleado(this.empleadoId, this.rolSeleccionado.id, this.sucursalSeleccionada.id).subscribe()
  }

  getEmpleado() {
    this.service.getByIdVM(this.empleadoId).subscribe(
      data => {
        this.empleado = data;
        this.obtenerSucursales();
        this.obtenerRoles();
      });
  }

  obtenerSucursales() {
    this.serviceSucursal.ObtenerTodoSucursales(this.comercioId)
      .subscribe(data => {
        this.sucursales = data;

        this.sucursalForm = this.fb.group({
          sucursalControl: [this.sucursales[this.obtenerIndiceSucursalById(this.empleado.IdSucursal)]]
        });
      });
  }

  obtenerIndiceSucursalById(id: number) {
    for (let i = 0; i <= this.sucursales.length; i++) {
      if (this.sucursales[i].id == id) {
        return i;
      }
    }
  }

  obtenerRoles() {
    this.serviceRol.obtenerRolesPorComercio(this.comercioId)
      .subscribe(data => {
        this.roles = data;
        this.rolForm = this.fb.group({
          rolControl: [this.roles[this.obtenerIndiceRolById(this.empleado.IdRol)]]
        });
      });

  }

  obtenerIndiceRolById(id: number) {
    for (let i = 0; i <= this.roles.length; i++) {
      if (this.roles[i].id == id) {
        return i;
      }
    }
  }

  
  verCambio(){
    this.rolSeleccionado = this.rolForm.controls['rolControl'].value;
    this.sucursalSeleccionada = this.sucursalForm.controls['sucursalControl'].value;
    console.log(this.rolSeleccionado)
    console.log(this.sucursalSeleccionada)
    //TODO: el update
  }
}
